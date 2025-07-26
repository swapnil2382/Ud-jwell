const mongoose = require("mongoose");

const jewellerySchema = new mongoose.Schema(
  {
    prodname: {
      type: String,
      required: [true, "Product name is required"],
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 1000,
    },
    weights: [
      {
        type: Number,
        required: [true, "Weights are required"],
      },
    ],
    metal: {
      type: String,
      enum: {
        values: ["gold", "silver"],
        message: "Metal must be either Gold or Silver",
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
      required: [true, "Gender is required"],
    },
    occasion: {
      type: String,
      required: [true, "Occasion is required"],
      enum: ["casual", "engagement", "wedding"],
    },
    purity: {
      type: String,
      required: [true, "Purity is required"],
      enum: ["24k", "22k", "18k", "14k", "10k", "925silver", "999silver"],
    },
    filterLists: {
      type: [String],
      required: [true, "At least one category is required"],
      lowercase: true,
      trim: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    images: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.every((url) =>
            /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/.test(url)
          );
        },
        message: "All images must be valid URLs ending with jpg, jpeg, png, or webp",
      },
      default: [],
    },
    customizable: {
      type: String,
      enum: {
        values: ["yes", "no"],
        message: "Customizable must be either 'yes' or 'no'",
      },
      default: "no",
    },
    materialDescription: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    newArrival: {
      type: String,
      enum: {
        values: ["yes", "no"],
        message: "New Arrival must be either 'yes' or 'no'",
      },
      default: "no",
    },
  },
  {
    timestamps: true,
  }
);

// Normalize boolean values to strings in pre-save hook
jewellerySchema.pre('save', function(next) {
  console.log('Pre-save hook - customizable:', this.customizable, 'newArrival:', this.newArrival); // Debug log
  if (this.customizable === true) this.customizable = 'yes';
  if (this.customizable === false) this.customizable = 'no';
  if (this.newArrival === true) this.newArrival = 'yes';
  if (this.newArrival === false) this.newArrival = 'no';
  next();
});

const Jewellery = mongoose.model("Jewellery", jewellerySchema);

module.exports = Jewellery;