const mongoose = require("mongoose");

const jewellerySchema = new mongoose.Schema(
  {
    prodname: {
      type: String,
      required: [true, "Product name is required"], // e.g. "Kasu Stud"
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "category is required"], // e.g., "Ring", "Chain", "Stud"
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
      maxlength: 1000,
    },
    weights: [
      {
        type: Number, // e.g., 0.5, 2, 12, 40 (in grams)
        required: [true, "weights is required"],
      },
    ],
    metal: {
      type: String,
      enum: {
        values: ["gold", "silver"],
        message: "metal must be either Gold or Silver",
      },
      required: [true, "Metal is required"],
    },
    metalColour: {
      type: String,
      lowercase: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["men", "women", "kids", "unisex"],
        message: "Gender can be either Men, Women, Kids, or Unisex",
      },
      required: [true, "gender is required"],
    },
    occasion: {
      type: String,
      required: [true, "occasion is required"],
      enum: ["casual", "engagement", "wedding"],
    },
    purity: {
      type: String,
      required: [true, "purity is required"],
      enum: ["24", "22", "18", "14", "10", "925", "999"],
    },
    filterLists: {
      type: [String], // This means it's a list/array of strings
      required: [true, "At least one category is required"],
      lowercase: true,
      trim: true,
      enum: {
        values: [
          "gold",
          "silver",
          "men",
          "women",
          "kids",
          "unisex",
          "aaram",
          "bangle",
          "bracelet",
          "chain",
          "coin",
          "pendant",
          "ring",
          "stud",
          "new arrival",
          "trending",
          "handmade",
          "casual",
          "engagement",
          "festive collection",
          "wedding collection",
        ],
        message: "{VALUE} is not a valid category",
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
    images: {
      type: [String], // URLs of images
      validate: {
        validator: function (arr) {
          return arr.every((url) =>
            /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/.test(url)
          );
        },
        message:
          "All images must be valid URLs ending with jpg, jpeg, png, or webp",
      },
      default: [],
    },
    customizable: {
      type: Boolean,
      default: false,
    },
    materialDescription: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

const Jewellery = mongoose.model("Jewelry", jewellerySchema);

module.exports = Jewellery;
