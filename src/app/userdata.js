import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    userdata: [
        // {
        //     title:'tittle of the post',
        //     likecount:'00',
        //     contentofthepost:'hsfdvhqbrjf',
        //     slug:'whrth2wrt4h',
        //     userid:'firstuser',
        //     imageid:'',
        // },
    ]
}
export const data=createSlice({
    name:"data_of_user",
    initialState,
    // reducers:{
    //     Addpost:(state,action)=>{
    //         const usernewdata={
    //             title:action.payload.title,
    //             likecount:'0',
    //             contentofthepost:action.payload.contentofthepost,
    //             slug:action.payload.slug,
    //             userid:action.payload.userid,
    //             imageid:action.payload.imageid,
    //         }
    //     }
    // }
});
// export const {Addpost} = data.actions;
const reducers=data.reducer;
export default reducers;