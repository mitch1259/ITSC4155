import Axios from "axios"

const CREATE_GOAL_BASE_URL = "http://localhost:3002/api/createGoal"



class GoalService {


    getAllGoals() {
        return Axios.get("http://localhost:3002/api/createGoal/");
    }

    createGoal(goal) {
        return Axios.post(CREATE_GOAL_BASE_URL, goal)
    }

    getGoal(goal) {
        return Axios.post(CREATE_GOAL_BASE_URL + '/' + goal.goalId,goal)
    }

    updateGoal(goalId, goal) {
        return Axios.post(CREATE_GOAL_BASE_URL + "/updateGoal/", goal);
    }

    deleteGoal(goalId) {
        return Axios.post('http://localhost:3002/api/createGoal/deleteGoal', goalId);
    }

    updateContribution(goal) {
        return Axios.post('http://localhost:3002/api/contribution', ...goal)
    }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default new GoalService();