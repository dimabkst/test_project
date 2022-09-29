/**
 * @swagger
 * 
 * components:
 *   schemas:
 *     200StatusSchema:
 *       type: integer
 *       description: Status code that equals 200
 *       example: 200
 * 
 *     201StatusSchema:
 *       type: integer
 *       description: Status code that equals 201
 *       example: 201
 * 
 *     DefaultUserOutput:
 *       type: object
 *       required:
 *         - id
 *         - firstName
 *         - lastName
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: First name of the user
 *           minLength: 1
 *           maxLength: 50
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *           minLength: 1
 *           maxLength: 50
 *         username:
 *           type: string
 *           pattern: ^[^_\s]\w+[^_\s]$
 *           description: Username of the user
 *           minLength: 3
 *           maxLength: 20
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the user
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the user
 *         facebookId:
 *           type: string
 *           description: Facebook id of the user
 *           readOnly: true
 *         googleId:
 *           type: string
 *           description: Google id of the user
 *           readOnly: true
 *         city:
 *           type: string
 *           description: City of the user
 *           minLength: 1
 *           maxLength: 50
 *         birthday:
 *           type: string
 *           format: date
 *           description: Birthday of the user
 *         profilePicture:
 *           type: string
 *           description: Profile picture of the user
 * 
 *     ExtendedUserOutput:
 *       type: object
 *       required:
 *         - id
 *         - firstName
 *         - lastName
 *         - posts
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: First name of the user
 *           minLength: 1
 *           maxLength: 50
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *           minLength: 1
 *           maxLength: 50
 *         username:
 *           type: string
 *           pattern: ^[^_\s]\w+[^_\s]$
 *           description: Username of the user
 *           minLength: 3
 *           maxLength: 20
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the user
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the user
 *         facebookId:
 *           type: string
 *           description: Facebook id of the user
 *           readOnly: true
 *         googleId:
 *           type: string
 *           description: Google id of the user
 *           readOnly: true
 *         city:
 *           type: string
 *           description: City of the user
 *           minLength: 1
 *           maxLength: 50
 *         birthday:
 *           type: string
 *           format: date
 *           description: Birthday of the user
 *         profilePicture:
 *           type: string
 *           description: Profile picture of the user
 *         friendsIds:
 *           type: array
 *           items:
 *             type: string
 *           uniqueItems: true
 *           description: Array of ids of friends of the user
 *           readOnly: true
 *         posts:
 *           type: array
 *           uniqueItems: true
 *           description: List of posts by the user
 *           items:
 *             $ref: '#/components/schemas/Post'
 * 
 *     ExtendedPostOutput:
 *       type: object
 *       required:
 *         - id
 *         - createdAt
 *         - content
 *         - authorId
 *         - likes
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated id of the post
 *           readOnly: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Auto-generated creation time of the post
 *           readOnly: true
 *         content:
 *           type: string
 *           description: Content of the post
 *           minLength: 1
 *           maxLength: 1000
 *         authorId:
 *           type: string
 *           description: Id of the User who is an author of the post
 *           readOnly: true
 *         likes:
 *           type: array
 *           uniqueItems: true
 *           description: List of likes below the post
 *           items:
 *             $ref: '#/components/schemas/Like'
 * 
 *     ExtendedCommentOutput:
 *       type: object
 *       required:
 *         - id
 *         - createdAt
 *         - content
 *         - authorId
 *         - postId
 *         - likes
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated id of the comment
 *           readOnly: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Auto-generated creation time of the comment
 *           readOnly: true
 *         content:
 *           type: string
 *           description: Content of the comment
 *           minLength: 1
 *           maxLength: 100
 *         authorId:
 *           type: string
 *           description: Id of the User who is an author of the comment
 *           readOnly: true
 *         postId:
 *           type: string
 *           description: Id of the Post below which the comment is written
 *           readOnly: true
 *         likes:
 *           type: array
 *           uniqueItems: true
 *           description: List of likes below the comment
 *           items:
 *             $ref: '#/components/schemas/Like'
 * 
 *   parameters:
 *     userIdParameter:
 *       in: path
 *       name: userId
 *       description: Database id of the wanted user
 *       required: true
 *       schema:
 *         type: string
 * 
 *     friendIdParameter:
 *       in: path
 *       name: friendId
 *       description: Database id of the wanted user
 *       required: true
 *       schema:
 *         type: string
 * 
 *     postIdParameter:
 *       in: path
 *       name: postId
 *       description: Database id of the wanted post
 *       required: true
 *       schema:
 *         type: string
 * 
 *     commentIdParameter:
 *       in: path
 *       name: commentId
 *       description: Database id of the wanted comment
 *       required: true
 *       schema:
 *         type: string
 * 
 *     friendsRequestIdParameter:
 *       in: path
 *       name: friendsRequestId
 *       description: Database id of the wanted friends request
 *       required: true
 *       schema:
 *         type: string
 * 
 *   responses:
 *     400Error:
 *       description: Bad Request
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *               - message
 *             properties:
 *               status:
 *                 type: integer
 *                 description: Status code that equals 400
 *                 example: 400
 *               message:
 *                 type: string
 *                 description: Error message
 * 
 *     401Error:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *               - message
 *             properties:
 *               status:
 *                 type: integer
 *                 description: Status code that equals 401
 *                 example: 401
 *               message:
 *                 type: string
 *                 description: Error message
 * 
 *     403Error:
 *       description: Forbidden
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *               - message
 *             properties:
 *               status:
 *                 type: integer
 *                 description: Status code that equals 403
 *                 example: 403
 *               message:
 *                 type: string
 *                 description: Error message
 * 
 *     404Error:
 *       description: Not Found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *               - message
 *             properties:
 *               status:
 *                 type: integer
 *                 description: Status code that equals 404
 *                 example: 404
 *               message:
 *                 type: string
 *                 description: Error message
 * 
 *     409Error:
 *       description: Conflict
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *               - message
 *             properties:
 *               status:
 *                 type: integer
 *                 description: Status code that equals 409
 *                 example: 409
 *               message:
 *                 type: string
 *                 description: Error message
 * 
 *     500Error:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *               - message
 *             properties:
 *               status:
 *                 type: integer
 *                 description: Status code that equals 500
 *                 example: 500
 *               message:
 *                 type: string
 *                 description: Error message
 * 
 *   securitySchemes:
 *     bearerAuthorization:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */