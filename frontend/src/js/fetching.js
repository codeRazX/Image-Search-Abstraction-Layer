import { URL_SERVER } from "./env";

export const fetchRecent = async()=>{
    const url = `${URL_SERVER}/recent`;

    try{
        const req = await fetch(url);
        return req.json();
    }
    catch(error){
        console.log(error);
    }
}


export const fetchSearch = async(search, page)=>{
    const url = `${URL_SERVER}/search?search=${search}&page=${page}`;

    try{
        const req = await fetch(url);
        if(!req.ok){
            const error = await req.json();
            throw new Error(error);
        }
        return req.json();
    }
    catch(error){
        console.error(error);
        throw error;
    }
}