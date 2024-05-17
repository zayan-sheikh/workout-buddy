import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { Tilt } from 'react-tilt';

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('https://workout-buddy-topaz.vercel.app/api/workouts')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    fetchWorkouts()
  }, [dispatch])

  return (
    <div className="home">
      <div class="workouts">
        {workouts && workouts.map(workout => (
      <Tilt options={{max: 10, transition: true, scale: 1.03, easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)", glare:true}}>
          <WorkoutDetails workout={workout} key={workout._id} />
      </Tilt>
        ))}
      </div>
      <WorkoutForm />
      

    </div>
  )
}

export default Home