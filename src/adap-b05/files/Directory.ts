import { Node } from "./Node";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    public getNoChildren(): number{
        return this.childNodes.size
    }

    public getChild(i: number){
        return [...this.childNodes][i]
    }

    public findChild(bn: string, foundnodes: Set<Node>): Set<Node>{
        for(let i = 0; i < this.getNoChildren(); i++){
        let child: Node = this.getChild(i);
        
        if(child.getBaseName() === bn) foundnodes.add(child);

        if(child instanceof Directory) child.findChild(bn, foundnodes);
        }
        return foundnodes;

    }

}