import './App.css';
import styled from 'styled-components';
import { useState } from 'react';

const StyledApp = styled.div`
  text-align: center;
  display: flex;
  height: 100vh;
	flex-direction: column;
	align-items:center;
  background-color: #F1FFFA;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  // font-size: 1px;
  padding: 10px;
  margin-top: 50px;
  border-radius: 10px;
`;

const StyledButton = styled.button`
  background-color: #ff7a62;
  color: white;
  border-style: none;
  border-radius: 10px;
  margin-left: 10px;
  margin-top: 5px;
  &:hover {
    background-color: #ffae9f;
  }
`;

// const StyledLabel = styled.label`
//   margin-right: 5px;
// `;

const StyledHeader = styled.h1`
  font-size: 28px;
  color: black;
  padding: 15px;
  text-align: center
  `
const StyledUl = styled.ul`
  list-style-type: none;
  // position: fixed;
  
`

const StyledLi = styled.li`
  color: white;
  margin: 4px;
  position: relative;
  z-index: 1;
  font-size: 22px;
  counter-increment: leaderboard;
  width: 90%;
  padding: 7px 1px 2px 5px;
  background: linear-gradient(to right,  #ff7a62 50%, white);
`

const StyledDiv = styled.div`
  position: fixed;
  margin-top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  // height: 350px;
  background: linear-gradient(to right, lightgray 20%, white);
  border-radius: 10px;
  box-shadow: 0 7px 30px rgba(62, 9, 11, .3);
`

const App = () => {

  const [name, setName] = useState('')
  const [score, setScore] = useState('')
  const [leaderboard, setLeaderboard] = useState([
    { name: "Mike", score: '2 min 34 sec' },
    { name: "Alex", score: '5 min 33 sec' },
    { name: "Helen", score: '12 min 04 sec' },
    { name: "Dave", score: '5 min 43 sec' },
    { name: "Dwight", score: '7 min 24 sec' },
    { name: "Oda", score: '3 min 14 sec' },
    { name: "Emma", score: '2 min' },
    { name: "Melissa", score: '2 min 49 sec' },
    { name: "Miguel", score: '1 min 56 sec' },
    { name: "Arthur", score: '12 min 56 sec' },
    { name: "Fabio", score: '13 min 56 sec' },
    { name: "Elizabeth", score: '14 min 56 sec' },

  ])



  const convertTime = (string) => {
    // console.log(string.split(' ')[0] + string.split(' ')[2])
    const min = parseInt(string.split(' ')[0]) * 60
    const sec = parseInt(string.split(' ')[2])
    if (!sec) {
      return min
    }
    return min + sec
  }


  const sortedList = leaderboard.sort((a, b) => convertTime(a.score) - convertTime(b.score)).slice(0, 10)

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleScore = (e) => {
    const newScore = `${e.target.value.split(':')[0]} min ${e.target.value.split(':')[1]} sec`
    setScore(newScore)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newScore = { name: name, score: score }
    // send this score to backend 

    setLeaderboard([...leaderboard, newScore])
    e.target.reset();

  }

  return (
    <StyledApp>
      <StyledForm onSubmit={handleSubmit}>
        {/* <label htmlFor="name">Name:</label> */}
        <input
          type="text"
          name="name"
          placeholder='name'
          // value={name}
          onChange={handleName}
        />
        {/* <label htmlFor="name">Score:</label> */}
        <input
          type="text"
          name="score"
          placeholder='mm:ss'
          // value={''}
          onChange={handleScore}
        />
        <StyledButton type="submit">Submit your score</StyledButton>
        {/* <input type="submit" value="Submit" /> */}
      </StyledForm>
      <StyledDiv>

        <StyledHeader> {"<Salt />"} Leaderboard</StyledHeader>
        <StyledUl>
          {sortedList.map(item => <StyledLi key={item.score}>{item.name}: {item.score}</StyledLi>)}
        </StyledUl>
      </StyledDiv >
    </StyledApp>
  );

}


export default App;
