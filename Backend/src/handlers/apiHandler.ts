export class ApiHandler{
    private success:boolean;
    constructor(private readonly message?:string,private readonly result?:any){
        this.success=true,
        this.message=message,
        this.result=result
    }
}