const fs = require('fs');

class CartManager {
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

  addProduct(data) {
    
    
     const product = {
      id: this.products.length + 1,
      dataProduct: data.product || [] // Default empty array for products
      
      
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

module.exports = CartManager;