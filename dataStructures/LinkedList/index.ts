class LinkedListNode<T> {
    public previous: LinkedListNode<T> | null = null;
    public next: LinkedListNode<T> | null = null;
    public value: T | null = null;

    constructor(left: LinkedListNode<T> | null, right: LinkedListNode<T> | null, value: T) {
        this.value = value;
        this.previous = left;
        this.next = right;
    }

    public addNodeToLeft(value: T): LinkedListNode<T> {
        const node = new LinkedListNode(this.previous, this, value);

        if (this.previous) {
            this.previous.next = node;
        }

        this.previous = node;

        return node;
    }

    public addNodeToRight(value: T): LinkedListNode<T> {
        const node = new LinkedListNode(this, this.next, value);

        // if node has another node to the right, is not last node in list
        if (this.next) {
            // have left node property of node to the right pointing at the new node
            this.next.previous = node;
        }
        
        // have right node property point at new node
        this.next = node;

        return node;
    }
}

export class LinkedList<T> {
    private head: LinkedListNode<T> | null = null;
    private tail: LinkedListNode<T> | null = null;
    private size = 0;

    constructor(firstValue: T | null) {
        if (firstValue) {
            this.append(firstValue);
        }
    }

    public append(value: T) {
        
        // if no last node, list is empty
        if (!this.tail) {
            const newNode = new LinkedListNode(this.tail, null, value);

            // head and tail should now both point at the new node
            this.tail = newNode;
            this.head = newNode;
        } else {
            // else add new node to right of tail
            const newNode = this.tail.addNodeToRight(value)
            // set new node as tail
            this.tail = newNode;
        }

        this.incrementSize();
        return true;
    }

    public preprend(value: T) {
        
        // if no head node, list is empty
        if (!this.head) {
            const newNode = new LinkedListNode(null, this.head, value);

            // head and tail should now point at new node
            this.head = newNode;
            this.tail = newNode;
        } else {
            // else add new node to left of head
            const newNode = this.head.addNodeToLeft(value);
            // set new node as tail
            this.head = newNode
        }

        this.incrementSize();
        return true;
    }

    public insert(value: T, index: number) {
        // if index is length of list, append to list
        if (index === this.size) {
            return this.append(value);
        } else if (index === 0) {
            // prepend if inserting at position 0
            return this.preprend(value);
        } else if (index > this.size || !this.head) {
            return false;
        }

        const nodeAtPos = this.getNode(index);

        if (!nodeAtPos) {
            return false;
        }
        
        nodeAtPos.addNodeToLeft(value)
        this.incrementSize();

        return true;
    }

    public remove(index: number) {
        if (index === this.size - 1) {
            return this.pop();
        } else if (index === 0) {
            return this.shift();
        }

        const node = this.getNode(index);

        if (!node || !node.previous || !node.next) {
            return false;
        }

        node.previous.next = node.next;
        node.next.previous = node.previous;

        this.decrementSize();

        return true
    }

    public pop() {
        
        if (!this.tail) {
            return false;
        }
        
        const poppedNode: LinkedListNode<T> = this.tail;

        if (!this.tail.previous) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail.previous.next = null;
            this.tail = this.tail.previous;
        }

        this.decrementSize();

        return poppedNode.value;
    }

    public shift() {
        if (!this.head) {
            return false;
        }

        const shiftedNode = this.head;

        if (!this.head.next) {
            this.head = null;
            this.tail = null;
        } else {
            this.head.next.previous = null;
            this.head = this.head.next;
        }

        this.decrementSize();

        return shiftedNode.value;
    }

    public get(index: number) {
        const node = this.getNode(index);

        return node ? node.value : false;
    }

    private getNode(index: number) {
        if (index >= this.size || index < 0) {
            return false;
        }

        let node: LinkedListNode<T> | null = this.head;

        // start iterating at 1 since we already assigned the head node to our node var
        for (let i = 1; i <= index; i++) {
            if (!node) {
                return false;
            }

            node = node.next;
        }

        if (!node) {
            return false;
        }

        return node;
    }

    private incrementSize() {
        this.size++;
    }

    private decrementSize() {
        this.size--;
    }

    public print() {
        const printArr: (T | null)[] = [];

        let node: LinkedListNode<T> | null = this.head;

        while (node?.next) {
            printArr.push(node.value);
            node = node.next;
        }

        if (node) {
            printArr.push(node.value);
        }

        console.log(printArr);
    }
}