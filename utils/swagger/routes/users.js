/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all users
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: List of all users is returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - data
 *               properties:
 *                 status:
 *                   $ref: '#/components/schemas/200StatusSchema'
 *                 data:
 *                   type: object
 *                   required: users
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/DefaultUserOutput'
 *       '500':
 *         $ref: '#/components/responses/500Error'
 * 
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cretates user with given body
 *     tags:
 *       - Users
 *     requestBody:
 *       description: One of fields from [email, username, phoneNumber] is required 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *                 minLength: 1
 *                 maxLength: 50
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *                 minLength: 1
 *                 maxLength: 50
 *               username:
 *                 type: string
 *                 pattern: ^[^_\s]\w+[^_\s]$
 *                 description: Username of the user
 *                 minLength: 3
 *                 maxLength: 20
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the user
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number of the user
 *               city:
 *                 type: string
 *                 description: City of the user
 *                 minLength: 1
 *                 maxLength: 50
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: Birthday of the user
 *               profilePicture:
 *                 type: string
 *                 description: Profile picture of the user
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '201':
 *         description: User is created
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *             description: Location header with relative URL to created User
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - data
 *               properties:
 *                 status:
 *                   $ref: '#/components/schemas/201StatusSchema'
 *                 data:
 *                   type: object
 *                   required:
 *                     - accessToken
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: User JWT access token
 *       '500':
 *         $ref: '#/components/responses/500Error'
 * 
 */

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Returns user by given id
 *     tags:
 *       - Users
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParameter'
 *     responses:
 *       '200':
 *         description: User is found and returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - data
 *               properties:
 *                 status:
 *                   $ref: '#/components/schemas/200StatusSchema'
 *                 data:
 *                   type: object
 *                   required:
 *                     - user
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/ExtendedUserOutput'
 *       '401':
 *         $ref: '#/components/responses/401Error'
 *       '404':
 *         $ref: '#/components/responses/404Error'
 *       '500':
 *         $ref: '#/components/responses/500Error'
 * 
 */

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Updates user by given id with given body
 *     tags:
 *       - Users
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParameter'
 *     requestBody:
 *       required: true
 *       description: At least one of fields is required
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *                 minLength: 1
 *                 maxLength: 50
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *                 minLength: 1
 *                 maxLength: 50
 *               username:
 *                 type: string
 *                 pattern: ^[^_\s]\w+[^_\s]$
 *                 description: Username of the user
 *                 minLength: 3
 *                 maxLength: 20
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the user
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number of the user
 *               city:
 *                 type: string
 *                 description: City of the user
 *                 minLength: 1
 *                 maxLength: 50
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: Birthday of the user
 *               profilePicture:
 *                 type: string
 *                 description: Profile picture of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password of the user
 *     responses:
 *       '200':
 *         description: User is found and updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - data
 *               properties:
 *                 status:
 *                   $ref: '#/components/schemas/200StatusSchema'
 *                 data:
 *                   type: object
 *                   required:
 *                     - user
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/DefaultUserOutput'
 *       '401':
 *         $ref: '#/components/responses/401Error'
 *       '403':
 *         $ref: '#/components/responses/403Error'
 *       '404':
 *         $ref: '#/components/responses/404Error'
 *       '500':
 *         $ref: '#/components/responses/500Error'
 * 
 */

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Deletes user by given id
 *     tags:
 *       - Users
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParameter'
 *     responses:
 *       '200':
 *         description: User is found and deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - data
 *               properties:
 *                 status:
 *                   $ref: '#/components/schemas/200StatusSchema'
 *                 data:
 *                   type: integer
 *                   example: null
 *       '401':
 *         $ref: '#/components/responses/401Error'
 *       '403':
 *         $ref: '#/components/responses/403Error'
 *       '404':
 *         $ref: '#/components/responses/404Error'
 *       '500':
 *         $ref: '#/components/responses/500Error'
 * 
 */