import Map "mo:core/Map";
import Set "mo:core/Set";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  type Product = {
    name : Text;
    price : Nat;
    category : Text;
    isFeatured : Bool;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.name, product2.name);
    };
  };

  let products = Map.empty<Nat, Product>();
  let newsletterSubscribers = Set.empty<Text>();

  public shared ({ caller }) func addProduct(id : Nat, name : Text, price : Nat, category : Text, isFeatured : Bool) : async () {
    if (products.containsKey(id)) {
      Runtime.trap("Product ID already exists");
    };

    let product : Product = {
      name;
      price;
      category;
      isFeatured;
    };

    products.add(id, product);
  };

  public shared ({ caller }) func subscribeNewsletter(email : Text) : async () {
    if (newsletterSubscribers.contains(email)) {
      Runtime.trap("Email already subscribed to newsletter");
    };

    newsletterSubscribers.add(email);
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    products.values().toArray().sort().filter(
      func(p) { p.isFeatured }
    );
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().sort().filter(
      func(p) { p.category == category }
    );
  };

  public query ({ caller }) func isEmailSubscribed(email : Text) : async Bool {
    newsletterSubscribers.contains(email);
  };

  public query ({ caller }) func getProductById(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };
};
