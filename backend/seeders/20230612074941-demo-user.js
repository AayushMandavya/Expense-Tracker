'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert(
      'user',
      [
   {
    id: 1,
    firstName:'aayush',
    lastName: 'mandavya',
    email: 'user1@test.com',
    password: 'root',
    role:'admin',
    status: 'verified',


    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    firstName:'rohan',
    lastName: 'rana',
    email: 'user2@test.com',
    password: 'root1',
    role:'editor',
    status: 'verified',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    firstName:'sohan',
    lastName: 'stha',
    email: 'user3@test.com',
    password: 'root3',
    role:'cpanel',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
],
{}
    );
    await queryInterface.bulkInsert(
      'category',
      [
        {
          id: 1,
          name: 'food',
          description:'this is food items',
          color:'red',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'clothing',
          description:'this is luga items',
          color:'blue',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'entertainment',
          description:'this is majja items',
          color:'green',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'expenses',
      [
        {
          id: 1,
          title: 'ate breakfast',
          note: 'paisa kamako khaiyo',
          date: new Date(),
          category_id:1,
          user_id:1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: 'ate lunch',
          note: 'paisa kamako khaiyo',
          date: new Date(),
          category_id:2,
          user_id:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          title: 'ate dinner',
          note: 'paisa kamako khaiyo',
          date: new Date(),
          category_id:3,
          user_id:3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'tags',
      [
        {
          id: 1,
          title: 'food',
          color:'red',
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: 'food',
          color:'red',
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          title: 'food',
          color:'red',
          user_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
   
    await queryInterface.bulkInsert(
      'extags',
      [
        {
          id:1,
          expenses_id:1,
          tags_id:1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:1,
          expenses_id:1,
          tags_id:1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:1,
          expenses_id:1,
          tags_id:1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
