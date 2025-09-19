const Flat = require('../models/flat');

// Get all flats (any logged-in user)
const getAllFlats = async (req, res) => {
  try {
    const flats = await Flat.find().populate('owner', '-password');
    res.status(200).json(flats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get flat by ID
const getFlatById = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id).populate('owner', '-password');
    if (!flat) return res.status(404).json({ message: 'Flat not found' });
    res.status(200).json(flat);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add a new flat (owner is the logged-in user)
const addFlat = async (req, res) => {
  try {
    const { city, streetName, streetNumber, areaSize, hasAC, yearBuilt, rentPrice, dateAvailable } = req.body;

    const newFlat = new Flat({
      city,
      streetName,
      streetNumber,
      areaSize,
      hasAC,
      yearBuilt,
      rentPrice,
      dateAvailable,
      owner: req.user._id
    });

    await newFlat.save();
    res.status(201).json(newFlat);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a flat (only flat owner can update)
const updateFlat = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);
    if (!flat) return res.status(404).json({ message: 'Flat not found' });

    // Only owner can update
    if (flat.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden: Only owner can update' });
    }

    Object.assign(flat, req.body); // dynamically update fields
    await flat.save();
    res.status(200).json(flat);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a flat (only flat owner can delete)
const deleteFlat = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);
    if (!flat) return res.status(404).json({ message: 'Flat not found' });

    // Only owner can delete
    if (flat.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden: Only owner can delete' });
    }

    await flat.remove();
    res.status(200).json({ message: 'Flat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllFlats,
  getFlatById,
  addFlat,
  updateFlat,
  deleteFlat
};
