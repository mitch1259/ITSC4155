import axios from "axios"

const CREATE_GOAL_BASE_URL='http://localhost:3002/api/createGoal'



class CreateGoalService{


    getAllGoals(){
        return axios.get(CREATE_GOAL_BASE_URL);
    }

    createGoal(goal){
        return axios.post(CREATE_GOAL_BASE_URL,goal)
    }

    updateGoal(goalId, goal){
        return axios.put(CREATE_GOAL_BASE_URL+"/"+goalId,goal);
    }

    deleteGoal(goalId){
        return axios.delete(CREATE_GOAL_BASE_URL+'/'+goalId);
    }
}