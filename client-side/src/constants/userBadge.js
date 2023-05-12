import images from "./images"


export const userBadge = (pts) => {
    if(pts < 100) {
        return images.lowBadge
    }
    else if (pts >= 100 && pts < 1000) {
        return images.medBadge
    }
    else if( pts >= 1000) {
        return images.highBadge
    }
}