/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - id
 *        - firstName
 *        - lastName
 *        - createdAt
 *        - updatedAt
 *      properties:
 *        id:
 *          type: string
 *          description: Auto-generated id of the user
 *          readOnly: true
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: Auto-generated creation time of the user
 *          readOnly: true
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          description: Auto-generated last update time of the user
 *          readOnly: true
 *        friendsIds:
 *          type: array
 *          items:
 *            type: string
 *          uniqueItems: true
 *          description: Array of ids of friends of the user
 *          readOnly: true
 *        friendsRelationIds:
 *          type: array
 *          items:
 *            type: string
 *          uniqueItems: true
 *          description: Additional field to store m-n friends relationships of the user. Equals friendsIds of the user
 *          readOnly: true
 *        firstName:
 *          type: string
 *          description: First name of the user
 *          minLength: 1
 *          maxLength: 50
 *        lastName:
 *          type: string
 *          description: Last name of the user
 *          minLength: 1
 *          maxLength: 50
 *        username:
 *          type: string
 *          pattern: ^[^_\s]\w+[^_\s]$
 *          description: Username of the user
 *          minLength: 3
 *          maxLength: 20
 *        email:
 *          type: string
 *          format: email
 *          description: Email of the user
 *        phoneNumber:
 *          type: string
 *          description: Phone number of the user
 *        facebookId:
 *          type: string
 *          description: Facebook id of the user
 *          readOnly: true
 *        googleId:
 *          type: string
 *          description: Google id of the user
 *          readOnly: true
 *        city:
 *          type: string
 *          description: City of the user
 *          minLength: 1
 *          maxLength: 50
 *        birthday:
 *          type: string
 *          format: date
 *          description: Birthday of the user
 *        profilePicture:
 *          type: string
 *          description: Profile picture of the user
 *        password:
 *          type: string
 *          format: password
 *          description: Hashed password of the user
 *          writeOnly: true
 */
//  *      anyOf:
//  *        - required: [username, password]
//  *        - required: [email, password]
//  *        - required: [phoneNumber, password]
//  *        - required: [facebooId]
//  *        - required: [googleId]
//  */

/**
 * @swagger
 * components:
 *  schemas:
 *    FriendsRequest:
 *      type: object
 *      required:
 *        - id
 *        - from
 *        - to
 *      properties:
 *        id:
 *          type: string
 *          description: Auto-generated id of the friends request
 *          readOnly: true
 *        from:
 *          type: string
 *          description: Id of the User who sent the friends requst
 *          readOnly: true
 *        to:
 *          type: string
 *          description: Id of the User to whom the friends requst was sent
 *          readOnly: true
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Post:
 *      type: object
 *      required:
 *        - id
 *        - createdAt
 *        - content
 *        - authorId
 *      properties:
 *        id:
 *          type: string
 *          description: Auto-generated id of the post
 *          readOnly: true
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: Auto-generated creation time of the post
 *          readOnly: true
 *        content:
 *          type: string
 *          description: Content of the post
 *          minLength: 1
 *          maxLength: 1000
 *        authorId:
 *          type: string
 *          description: Id of the User who is an author of the post
 *          readOnly: true
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Like:
 *      type: object
 *      required:
 *        - id
 *        - createdAt
 *        - authorId
 *      properties:
 *        id:
 *          type: string
 *          description: Auto-generated id of the like
 *          readOnly: true
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: Auto-generated creation time of the like
 *          readOnly: true
 *        authorId:
 *          type: string
 *          description: Id of the User who is an author of the like
 *          readOnly: true
 *        postId:
 *          type: string
 *          description: Id of the Post below which the like is leaved
 *          readOnly: true
 *        commentId:
 *          type: string
 *          description: Id of the Comment below which the like is leaved
 *          readOnly: true
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Comment:
 *      type: object
 *      required:
 *        - id
 *        - createdAt
 *        - content
 *        - authorId
 *        - postId
 *      properties:
 *        id:
 *          type: string
 *          description: Auto-generated id of the comment
 *          readOnly: true
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: Auto-generated creation time of the comment
 *          readOnly: true
 *        content:
 *          type: string
 *          description: Content of the comment
 *          minLength: 1
 *          maxLength: 100
 *        authorId:
 *          type: string
 *          description: Id of the User who is an author of the comment
 *          readOnly: true
 *        postId:
 *          type: string
 *          description: Id of the Post below which the comment is written
 *          readOnly: true
 */