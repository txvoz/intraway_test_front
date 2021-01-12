export interface Item{
    value?:number;
    converValue?:string;
}

export interface FizzBuzz{
    id?:number;
    min?:string;
    max?:string;
    hasMultiple3?:string;
    hasMultiple5?:string;
    createdDate?:string;
    items?: Item[];
}