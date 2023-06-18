export class Navbar {
  id : number | undefined;
  name: string = "";
  to: string = "";

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.to) this.to = initializer.to;
  }
}
