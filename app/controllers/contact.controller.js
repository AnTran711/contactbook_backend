import ApiError from '../api_error.js';
import ContactService from '../services/contact.service.js';
import MongoDB from '../utils/mongodb.util.js';

class ContactController {
  // Create and Save a new Contact
  async create(req, res, next) {
    if(!req.body?.name) {
      return next(new ApiError(400, 'Name cannot be empty'));
    }

    try {
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.create(req.body);
      return res.send(document);
    } catch (err) {
      console.error(err);
      return next(new ApiError(500, 'An error occurred while creating the contact'));
    }
  }

  // Retrieve all contacts of a user from the database
  async findAll(req, res, next) {
    let documents = [];

    try {
      const contactService = new ContactService(MongoDB.client);
      const { name } = req.query;
      if(name) {
        documents = await contactService.findByName(name);
      } else {
        documents = await contactService.find({});
      }
      return res.send(documents);
    } catch (err) {
      console.error(err);
      return next(new ApiError(500, 'An error occurred while retrieving contacts'));
    }
  }

  // Find a single contact with an id
  async findOne(req, res, next) {
    try {
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.findById(req.params.id);
      if(!document) {
        return next(new ApiError(404, 'Contact not found'));
      }
      return res.send(document);
    } catch (err) {
      console.error(err);
      return next(
        new ApiError(500, `Error retrieving contact with id = ${req.params.id}`)
      );
    }
  }

  // Update a contact by the id in the request
  async update(req, res, next) {
    if(Object.keys(req.body).length === 0) {
      return next(new ApiError(400, 'Data to update cannot be empty'));
    }

    try {
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.update(req.params.id, req.body);
      if(!document) {
        return next(new ApiError(404, 'Contact not found!'));
      }
      return res.send({ message: 'Contact was updated successfully' });
    } catch(err) {
      console.error(err);
      return next(
        new ApiError(500, `Error updating contact with id = ${req.params.is}`)
      );
    }
  }

  // Delete a contact with the id in the request
  async delete(req, res, next) {
    try {
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.delete(req.params.id);
      if(!document) {
        return next(new ApiError(404, 'Contact not found'));
      }
      return res.send({ message: 'Contact was deleted successfully' });
    } catch (err) {
      console.error(err);
      return next(
        new ApiError(500, `Could not delete contact with id = ${req.params.id}`)
      );
    }
  }

  // Find all favorite contacts
  async findAllFavorite(req, res, next) {
    try {
      const contactService = new ContactService(MongoDB.client);
      const documents = await contactService.findFavorite();
      return res.send(documents);
    } catch(err) {
      console.error(err);
      return next(
        new ApiError(500, 'An error occurred while retrieving favorite contact')
      );
    }
  }

  // Delete all contacts in database
  async deleteAll(req, res, next) {
    try {
      const contactService = new ContactService(MongoDB.client);
      const deletedCount = await contactService.deleteAll();
      return res.send({
        message: `${deletedCount} contacts were deleted successfully`
      });
    } catch (err) {
      console.error(err);
      return next(
        new ApiError(500, 'An error occurred while removing all contacts')
      );
    }
  }
}

export default new ContactController();
