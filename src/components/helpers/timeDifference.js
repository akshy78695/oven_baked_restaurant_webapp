export const differenceBetweenDateInMinutes = (currentDate, Date) => {
    return (currentDate - Date) / 60000;
};
export const howMuchTimeAgo = (timeDifference) => {
    if (timeDifference > 525600)
        if (parseInt(timeDifference / 535600) === 1)
            return `${parseInt(timeDifference / 525600)} year ago`;
        else return `${parseInt(timeDifference / 525600)} years ago`;
    else if (timeDifference > 43800)
        if (parseInt(timeDifference / 43800) === 1)
            return `${parseInt(timeDifference / 43800)} month ago`;
        else return `${parseInt(timeDifference / 43800)} months ago`;
    else if (timeDifference > 10080)
        if (parseInt(timeDifference / 10080) === 1)
            return `${parseInt(timeDifference / 10080)} week ago`;
        else return `${parseInt(timeDifference / 10080)} weeks ago`;
    else if (timeDifference > 1440)
        if (parseInt(timeDifference / 1440) === 1)
            return `${parseInt(timeDifference / 1440)} day ago`;
        else return `${parseInt(timeDifference / 1440)} days ago`;
    else if (timeDifference > 60)
        if (parseInt(timeDifference / 60) === 1)
            return `${parseInt(timeDifference / 60)} hour ago`;
        else return `${parseInt(timeDifference / 60)} hours ago`;
    else if (timeDifference === 0) return `just now`;
    else return `${timeDifference} minutes ago`;
};
