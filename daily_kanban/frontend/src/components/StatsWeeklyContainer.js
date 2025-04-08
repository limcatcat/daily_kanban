import React from "react";
import StatsWeekday from "./StatsWeekday";

const StatsWeeklyContainer = ({weeklyCompleted}) => {

    return (
        <>

            <div className="stats-weekly-container">
                <StatsWeekday
                    weekday='Monday'
                    completedTasks={weeklyCompleted.monday}
                />

                <StatsWeekday
                    weekday='Tuesday'
                    completedTasks={weeklyCompleted.tuesday}
                />

                <StatsWeekday
                    weekday='Wednesday'
                    completedTasks={weeklyCompleted.wednesday}
                />

                <StatsWeekday
                    weekday='Thursday'
                    completedTasks={weeklyCompleted.thursday}
                />

                <StatsWeekday
                    weekday='Friday'
                    completedTasks={weeklyCompleted.friday}
                />

                <StatsWeekday
                    weekday='Saturday'
                    completedTasks={weeklyCompleted.saturday}
                />

                <StatsWeekday
                    weekday='Sunday'
                    completedTasks={weeklyCompleted.sunday}
                />

            </div>

        </>
    )
    
}

export default StatsWeeklyContainer;