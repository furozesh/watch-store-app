const Cart = require("../models/Cart");
const Product = require("../models/Product");
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "محصول پیدا نشد",
      });
    }
    if (product.stock === 0) {
      return res.status(404).json({
        message: "محصول ناموجود است.",
      });
    }
    const allowedQuanitiy = Math.min(quantity, product.stock, 3);
    let cart = await Cart.findOne({
      user: req.user.id,
    });
    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [],
      });
    }
    const existingProduct = cart.items.find(
      (item) => item.product.toString() === productId,
    );
    if (existingProduct) {
      existingProduct.quantity = allowedQuanitiy;
    } else {
      cart.items.push({
        product: productId,
        quantity: allowedQuanitiy,
      });
    }
    await cart.save();
    console.log("USER:", req.user);
    console.log("CART SAVED:", cart);
    res.status(200).json({
      message: "Added To Cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product",
    );
    if (!cart) {
      return res.status(200).json({ items: [] });
    }
    const validItems = cart.items.filter((item) => item.product !== null);
    if (validItems.length !== cart.items.length) {
      cart.items = validItems;
      await cart.save();

      cart = await Cart.findOne({
        user: req.user.id,
      }).populate("items.product");
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not founf",
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        item.product && item.product.toString() !== req.params.productId,
    );
    await cart.save();

    res.status(200).json({
      message: "Removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getCartCount = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");
    if (!cart) {
      return res.json({
        count: 0,
      });
    }
    const validItems = cart.items.filter((item) => item.product);
    if (validItems.length !== cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }
    const count = validItems.reduce((sum, item) => sum + item.quantity, 0);
    res.json({ count });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");

    if (!cart) {
      return res.status(404).json({
        message: "سبد خرید پیدا نشد",
      });
    }
    const item = cart.items.find(
      (item) => item.product._id.toString() === req.params.productId,
    );
    if (!item) {
      return res.status(404).json({
        message: "محصول در سبد نیست",
      });
    }

    const maxQuantity = Math.min(item.product.stock, 3);
    item.quantity = Math.min(Math.max(quantity, 1), maxQuantity);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "سبد خرید پیدا نشد",
      });
    }

    cart.items = [];

    await cart.save();

    res.json({
      message: "سبد خرید خالی شد",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  getCartCount,
  updateCartQuantity,
  clearCart,
};
