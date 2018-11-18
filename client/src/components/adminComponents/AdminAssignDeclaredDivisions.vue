<template>
  <div class="card-scene">
    <Container orientation="horizontal" @drop="onColumnDrop($event)" drag-handle-selector=".column-drag-handle"
                @drag-start="dragStart($event)" >
      <Draggable v-for="column in scene.children" :key="column.id">
        <div :class="column.props.className">
          <div class="card-column-header">
            <span class="column-drag-handle">&#x2630;</span>
            {{column.name}}
          </div>
          <Container group-name="col" @drop="(e) => onCardDrop(column.id, e)" :get-child-payload="getCardPayload(column.id)"
                      drag-class="card-ghost" drop-class="card-ghost-drop" >
            <Draggable v-for="card in column.children" :key="card.id">
              <div :class="card.props.className" :style="card.props.style">
                <p>
                  {{card.data}}
                </p>
              </div>
            </Draggable>
          </Container>
        </div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag, generateItems } from '../dnd_utils'
import DeclaredDivisionsService from '@/services/DeclaredDivisionsService'

/* const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
const cardColors = [
  'azure',
  'beige',
  'bisque',
  'blanchedalmond',
  'burlywood',
  'cornsilk',
  'gainsboro',
  'ghostwhite',
  'ivory',
  'khaki'
] */
export default {
  name: 'Cards',
  components: { Container, Draggable },
  data: function () {
    return {
      declaredDivisionTypes: [],
      unassignedDivisions: [],
      columnNames: [],
      scene: {},
      divisionAssignments: []
    }
  },
  methods: {
    onColumnDrop: function (dropResult) {
      const scene = Object.assign({}, this.scene)
      scene.children = applyDrag(scene.children, dropResult)
      this.scene = scene
    },
    onCardDrop: function (columnId, dropResult) {
      // console.log('drop', dropResult, columnId)
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        // console.clear()
        if (dropResult.addedIndex !== null) {
          // console.log(dropResult.payload.id, columnId)  assignDivision (id, divisionType)
          DeclaredDivisionsService.assignDivision({id: dropResult.payload.id, declaredDiv: columnId})
        }
        const scene = Object.assign({}, this.scene)
        const column = scene.children.filter(p => p.id === columnId)[0]
        const columnIndex = scene.children.indexOf(column)
        const newColumn = Object.assign({}, column)
        newColumn.children = applyDrag(newColumn.children, dropResult)
        scene.children.splice(columnIndex, 1, newColumn)
        this.scene = scene
      }
    },
    getCardPayload: function (columnId) {
      return index => {
        return this.scene.children.filter(p => p.id === columnId)[0].children[index]
      }
    },
    dragStart: function (test) {
      console.log('drag started', test.index)
    },
    getDivisions: async function () {
      var t = []
      for await (const i of this.declaredDivisionTypes) {
        const x = (await DeclaredDivisionsService.getAllUnassignedDivisions({year: this.$store.state.showYear}, {div: i.id})).data
        const y = generateItems(x.length, i => ({
          id: x[i].id,
          name: x[i].name
        }))
        t.push(y)
      }
      const x = (await DeclaredDivisionsService.getAllUnassignedDivisions({year: this.$store.state.showYear}, {div: 0})).data
      const y = generateItems(x.length, i => ({
        id: x[i].id,
        name: x[i].name
      }))
      t.push(y)
      return t
    }
  },
  async mounted () {
    // console.clear()
    var t = []
    this.declaredDivisionTypes = (await DeclaredDivisionsService.getAllDeclaredDivisions({year: this.$store.state.showYear})).data
    this.columnNames = generateItems(this.declaredDivisionTypes.length, i => ({
      id: this.declaredDivisionTypes[i].id,
      name: this.declaredDivisionTypes[i].name
    }))
    this.columnNames.push({ id: 0, name: 'Unassigned Divisions' }) // Add column for Unassigned Divisions
    // console.log('one', this.columnNames)
    t = await this.getDivisions()
    // console.log('t', t)
    // console.log('1 divisionAssignments', this.divisionAssignments)
    // console.log(+(Math.random() * 10).toFixed())
    // this.unassignedDivisions = (await DeclaredDivisionsService.getAllUnassignedDivisions({year: this.$store.state.showYear}, {div: 0})).data
    this.scene = {
      type: 'container',
      props: {
        orientation: 'horizontal'
      },
      children: generateItems(this.columnNames.length, i => ({
        id: this.columnNames[i].id, // `${i}`, // `column${i}`,
        type: 'container',
        name: this.columnNames[i].name,
        props: {
          orientation: 'vertical',
          className: 'card-container'
        },
        // children: generateItems(+(Math.random() * 10).toFixed() + 5, j => ({
        children: generateItems(t[i].length, j => ({ // (t[i], j => ({
          type: 'draggable',
          id: t[i][j].id, // `${i}${j}`,
          props: {
            className: 'card',
            style: { backgroundColor: 'blanchedalmond' }
          },
          data: t[i][j].name
        }))
      }))
    }
  }
}
</script>

<style scoped="">
  .card {
    margin: 5px;
  }
  .card, .card-container {
    padding: 5px;
    box-shadow: 0 1px 1px #000000;
    width: 235px;
    cursor: move;
    text-align: left;
  }
  div { display: block }
</style>
