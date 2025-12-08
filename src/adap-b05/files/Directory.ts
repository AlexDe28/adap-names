import { Node } from "./Node";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        IllegalArgumentException.assert(cn != this, "Object cannot add itself");
        IllegalArgumentException.assert(!this.hasChildNode(cn), "Object already contains child to be added");
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        IllegalArgumentException.assert(this.hasChildNode(cn), "Object does not contain child to be removed");
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