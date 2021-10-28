'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('gallery_image', [
      {
        image_url: 'https://kcsa-media.s3.us-east-2.amazonaws.com/2017-KCSA-Presidents-Cup/IMG_6959.JPG',
        gallery_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image_url: 'https://kcsa-media.s3.us-east-2.amazonaws.com/2017-KCSA-Presidents-Cup/IMG_7038.JPG',
        gallery_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image_url: 'https://kcsa-media.s3.us-east-2.amazonaws.com/2017-KCSA-Presidents-Cup/IMG_7174.JPG',
        gallery_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image_url: 'https://kcsa-media.s3.us-east-2.amazonaws.com/2017-KCSA-Presidents-Cup/IMG_6959.JPG',
        gallery_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image_url: 'https://kcsa-media.s3.us-east-2.amazonaws.com/2017-KCSA-Presidents-Cup/IMG_7038.JPG',
        gallery_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image_url: 'https://kcsa-media.s3.us-east-2.amazonaws.com/2017-KCSA-Presidents-Cup/IMG_6918.JPG',
        gallery_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image_url: 'https://kcsa-media.s3.us-east-2.amazonaws.com/2017-KCSA-Presidents-Cup/IMG_6959.JPG',
        gallery_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image_url: 'https://kcsa-media.s3.us-east-2.amazonaws.com/2016-KCSA-%ED%95%9C%EA%B0%80%EC%9C%84-%ED%86%A0%EB%84%88%EB%A8%BC%ED%8A%B8/IMG_6987.JPG',
        gallery_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('gallery_image', [
      {
        image_url:
          'https://kcsa-media.s3.us-east-2.amazonaws.com/2017-KCSA-Presidents-Cup/IMG_6959.JPG',
        gallery_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image_url:
          'https://kcsa-media.s3.us-east-2.amazonaws.com/2017-KCSA-Presidents-Cup/IMG_7038.JPG',
        gallery_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image_url:
          'https://kcsa-media.s3.us-east-2.amazonaws.com/2017-KCSA-Presidents-Cup/IMG_7174.JPG',
        gallery_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image_url:
          'https://kcsa-media.s3.us-east-2.amazonaws.com/2017-KCSA-Presidents-Cup/IMG_6959.JPG',
        gallery_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image_url:
          'https://kcsa-media.s3.us-east-2.amazonaws.com/2017-KCSA-Presidents-Cup/IMG_7038.JPG',
        gallery_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image_url:
          'https://kcsa-media.s3.us-east-2.amazonaws.com/2017-KCSA-Presidents-Cup/IMG_6918.JPG',
        gallery_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image_url:
          'https://kcsa-media.s3.us-east-2.amazonaws.com/2017-KCSA-Presidents-Cup/IMG_6959.JPG',
        gallery_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image_url:
          'https://kcsa-media.s3.us-east-2.amazonaws.com/2016-KCSA-%ED%95%9C%EA%B0%80%EC%9C%84-%ED%86%A0%EB%84%88%EB%A8%BC%ED%8A%B8/IMG_6987.JPG',
        gallery_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
};
