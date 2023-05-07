export const rankEnum = (rank) => {
    let e;
    let c;
    switch(rank) {
        case 1: 
          e = "st";
          c = "#F2C344";
          break;
        case 2:
          e = "nd";
          c = "#715B20";
          break;
        case 3:
          e = "rd";
          c = "grey"
          break;
        default: 
          e = "th";
          c = "#C4CDD4";
    }
    return {e, c};
}