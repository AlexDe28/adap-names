import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        if(delimiter) this.delimiter = delimiter;

        this.name = source;

        let newcomponents: string[] = this.splitComponents();
        this.noComponents = newcomponents.length;
    }

    public asString(delimiter: string = this.delimiter): string {
        let outputName: string = "";
            for(let idx_letter = 0; idx_letter < this.name.length; idx_letter++){
                    if(this.name[idx_letter]===ESCAPE_CHARACTER){
                    //Skip first appearance of escape character
                    idx_letter += 1;
                    if(idx_letter < this.name.length)outputName += this.name[idx_letter]
                    }
                    else outputName += this.name[idx_letter]
            }
            return outputName;
    }

    public asDataString(): string {
        return this.name;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.name.length === 0;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
        let components: string[] = this.splitComponents();
        return components[x];
    }

    public setComponent(n: number, c: string): void {
        let components: string[] = this.splitComponents();

        components[n] = c;
        this.name = components.join(this.delimiter);
        let newcomponents: string[] = this.splitComponents();
        this.noComponents = newcomponents.length;
    }

    public insert(n: number, c: string): void {
        let components: string[] = this.splitComponents();
   
        components.splice(n, 0, c);
        this.name = components.join(this.delimiter);
        let newcomponents: string[] = this.splitComponents();
        this.noComponents = newcomponents.length;
    }

    public append(c: string): void {
        this.name = this.name + this.delimiter + c;
        let newcomponents: string[] = this.splitComponents();
        this.noComponents = newcomponents.length;
    }

    public remove(n: number): void {
        let components: string[] = this.splitComponents();

        components.splice(n,1);
        this.name = components.join(this.delimiter);
        let newcomponents: string[] = this.splitComponents();
        this.noComponents = newcomponents.length;
    }

    public concat(other: Name): void {
        this.name = this.name + this.delimiter + other;
        let newcomponents: string[] = this.splitComponents();
        this.noComponents = newcomponents.length;
    }

    private splitComponents(): string[]{
        let components: string[] = [];

        let currentComponent: string = "";
        for(let idx_letter = 0; idx_letter < this.name.length; idx_letter++){
            
            if(this.name[idx_letter]==this.delimiter){
                components = components.concat(currentComponent);
                currentComponent = "";
            }
            else if(this.name[idx_letter]===ESCAPE_CHARACTER){
                if(((idx_letter+1) < this.name.length) && this.name[idx_letter+1]==this.delimiter){
                    //Delimiter is to be escaped
                    currentComponent += this.name[idx_letter] + this.name[idx_letter+1];
                    idx_letter += 1;
                }
                else currentComponent += this.name[idx_letter];
            }
            else currentComponent += this.name[idx_letter];
        }
        components = components.concat(currentComponent);

        return components;
        
    }
}