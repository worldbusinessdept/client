let token=localStorage.getItem("token");


export default function auth(){
    if (token!=null) {
        return 1;
    }else{
        return 0;//heello
    }
}