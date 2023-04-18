import Axios from "axios"

const CREATE_GOAL_BASE_URL="http://localhost:3002/api/createGoal"



class GoalService{


    getAllGoals(){
        return Axios.get(CREATE_GOAL_BASE_URL);
    }

    createGoal(goal){
        return Axios.post(CREATE_GOAL_BASE_URL,goal)
    }

    updateGoal(goalId, goal){
        return Axios.put(CREATE_GOAL_BASE_URL+"/"+goalId,goal);
    }

    deleteGoal(goalId){
        return Axios.delete(CREATE_GOAL_BASE_URL+'/'+goalId);
    }
    getGoal(goalId){
        return Axios.get(CREATE_GOAL_BASE_URL+'/'+goalId)
    }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default new GoalService();