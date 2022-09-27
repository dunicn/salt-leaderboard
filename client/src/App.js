import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const StyledApp = styled.div`
  text-align: center;
  display: flex;
  height: 100vh;
	flex-direction: column;
	// justify-content:center; 
  // padding-bottom: 50px;
	align-items:center;
  background-color: #F1FFFA;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: center;
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
const StyledUl = styled.ol`
	list-style-type: upper-greek;
  margin: 25px;
	// background: #3399ff;
  padding: 20px;
`

const StyledLi = styled.li`
  text-align: left;
  font-size: 24px;  
  cursor: pointer;
  border-style: none;
  border-radius: 50px; 
  color: white;
  // background: #eee;
  // width: 90%;
  margin: 5px;
  padding: 7px 1px 2px 5px;
  padding-left: 22px;
  background: linear-gradient(to right,  #ff7a62 50%, white);
`
// const StyledLi = styled.li`
//   color: white;
//   margin: 4px;
//   position: relative;
//   z-index: 1;
//   font-size: 22px;
//   counter-increment: leaderboard;
//   width: 90%;
//   padding: 7px 1px 2px 5px;
//   background: linear-gradient(to right,  #ff7a62 50%, white);
// `

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  margin-top: 30%;
  left: 20%;
  // transform: translate(-50%, -50%);
  // width: 450px;
  width: 60%;
  // height: 350px;
  background: linear-gradient(to right, lightgray 20%, white);
  border-radius: 10px;
  box-shadow: 0 7px 30px rgba(62, 9, 11, .3);
`

const StyledUlDiv = styled.div`
display: flex;
flex-direction: column;
`

const App = () => {

  const [name, setName] = useState('')
  const [score, setScore] = useState('')
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {

    const scores = JSON.parse(localStorage.getItem('scores'));
    if (scores) {
      setLeaderboard(scores);
    }

    // fetch(`/api/players`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   }
    // })
    //   .then((res) => res.json())
    //   .then((data) => setLeaderboard(data))
  }, []);


  const convertTime = (string) => {
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
    if (!e.target.value.split(':')[1]) {
      setScore(`${e.target.value} min`)
    } else {
      const newScore = `${e.target.value.split(':')[0]} min ${e.target.value.split(':')[1]} sec`
      setScore(newScore)
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newScore = { name: name, score: score, id: uuidv4() }
    // fetch("/api/players", {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(newScore),

    // })
    //   .then((res) => res.json())

    setLeaderboard([...leaderboard, newScore])
    localStorage.setItem('scores', JSON.stringify(leaderboard))
    e.target.reset();

  }

  const removeScore = (id) => {
    const updatedLeaderboard = leaderboard.filter(item => item.id !== id)
    console.log(updatedLeaderboard)
    setLeaderboard(updatedLeaderboard)
  }

  return (
    <StyledApp>
      <StyledForm onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder='name'
          onChange={handleName}
        />
        <input
          type="text"
          name="score"
          placeholder='mm:ss'
          onChange={handleScore}
        />
        <StyledButton type="submit">Submit your score</StyledButton>
      </StyledForm>
      <StyledDiv>

        <StyledHeader> {"<Salt />"} Leaderboard</StyledHeader>
        <StyledUlDiv>
          <StyledUl>
            {sortedList.map(item => <StyledLi onClick={() => removeScore(item.id)} key={item.id}>{item.name}: {item.score}</StyledLi>)}
          </StyledUl>

        </StyledUlDiv>
      </StyledDiv >
    </StyledApp>
  );

}


export default App;
