import images from "./images"


export const userBadge = (pts) => {
    if(pts < 50) {
        return images.lowBadge
    }
    else if (pts >= 50 && pts < 500) {
        return images.medBadge
    }
    else if( pts >= 500) {
        return images.highBadge
    }

}