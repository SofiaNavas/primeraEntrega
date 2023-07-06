const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.checkPath();
  }

  checkPath() {
    try {
      const fileContent = fs.readFileSync(this.path, 'utf-8');
      console.log("The file exists. The path is " + this.path);
      this.products = JSON.parse(fileContent) || [];
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('The file does not exist. Creating an empty file.');
        fs.writeFileSync(this.path, '[]', 'utf-8');
        console.log("The file was created in the path " + this.path);
      } else {
        console.error('Error reading products file:', error);
      }
    }
  }

 /* addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error(
        "Title, description, price, thumbnail, code, and stock are mandatory properties."
      );
    }

    const findCode = this.products.find(function(element) {
        return element.code === code;
         });


        if (findCode) {
            throw new Error("El campo code no se puede repetir");
       }


    const product = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    try {
      this.products.push(product);
      fs.writeFileSync(
        this.path,
        JSON.stringify(this.products, null, 2),
        'utf-8'
      );
      console.log("Product added successfully.");
    } catch (error) {
      console.error('Error in addProduct:', error);
    }
  }

  */

  addProduct(data) {
    if (!data.title || !data.description || !data.price || !data.thumbnail || !data.code || !data.stock) {
      throw new Error(
        "Title, description, price, thumbnail, code, and stock are mandatory properties."
      );
    }

    const findCode = this.products.find(function(element) {
        return element.code === data.code;
         });


        if (findCode) {
            throw new Error("El campo code no se puede repetir");
       }


    const product = {
      id: this.products.length + 1,
      title: data.title,
      description: data.description,
      price: data.price,
      thumbnail: data.thumbnail,
      code: data.code,
      stock: data.stock,
    };

    try {
      this.products.push(product);
      fs.writeFileSync(
        this.path,
        JSON.stringify(this.products, null, 2),
        'utf-8'
      );
      console.log("Product added successfully.");
    } catch (error) {
      console.error('Error in addProduct:', error);
    }
  }

  getProducts(){
    return this.products;
    }

    getProductById (id) {
        const findId = this.products.find(function(element) {
            return element.id === id;
          });

          if (!findId) {
            throw new Error("ID not found");
        } else {
            return findId
        }
    }

    updateProduct (id, updatedFields) {
        const findId = this.products.findIndex(function(element) {
            return element.id === id;
          });

          if (findId === -1) {
            throw new Error("ID not found");
        } else {
            
            const updatedProduct = {
                ...this.products[findId],
                ...updatedFields,
                id: this.products[findId].id, // Retain the original ID
              };
              
              this.products[findId] = updatedProduct;

              try {
                fs.writeFileSync(
                  this.path,
                  JSON.stringify(this.products, null, 2),
                  'utf-8'
                );
                console.log("Product updated successfully.");
              } catch (error) {
                console.error('Error in updateProduct:', error);
              }
            }
    }

    deleteProduct(id) {
        const findId = this.products.findIndex(function(element) {
            return element.id === id;
          });
    
        if (findId === -1) {
          throw new Error("ID not found");
        } else {
          this.products.splice(findId, 1);
    
          try {
            fs.writeFileSync(
              this.path,
              JSON.stringify(this.products, null, 2),
              'utf-8'
            );
            console.log("Product deleted successfully.");
          } catch (error) {
            console.error('Error in deleteProduct:', error);
          }
        }
    }
}

module.exports = ProductManager;

