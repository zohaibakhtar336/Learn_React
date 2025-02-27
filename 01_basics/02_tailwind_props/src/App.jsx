import './App.css'
import Card from './components/Card'

function App() {
  let myObj = {
    userName: "Zohaib",
    age: 22
  }

  let myArr = [1, 2, 3, 4, 5];

  return (
    <>
      <h1 class=" bg-gray-400 text-black p-4 rounded-xl mb-4 underline">
        Hello world!
      </h1>
      <Card userName="learnReact" btnText="Click me" />
      <Card userName="LearnReactWithHitesh" />
    </>
  )
}

export default App
