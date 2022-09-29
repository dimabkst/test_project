/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registers user with given body
 *     tags:
 *       - Auth
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
 *     responses:
 *       '201':
 *         description: User is registered
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *             description: Location header with relative URL to registered User
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
 * /auth/login:
 *   post:
 *     summary: Logins user by given login (email, username or phoneNumber) and password
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: One of fields from [email, username, phoneNumber] as login is required 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
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
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password of the user
 *     responses:
 *       '201':
 *         description: User is logined
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *             description: Location header with relative URL to logined User
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
 *       '400':
 *         $ref: '#/components/responses/400Error'
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
 * /auth/logout:
 *   delete:
 *     summary: Logout authorized user
 *     tags:
 *       - Auth
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     responses:
 *       '200':
 *         description: User is found and logout
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
 *       '500':
 *         $ref: '#/components/responses/500Error'
 * 
 */

/**
 * @swagger
 * /auth/login/facebook:
 *   get:
 *     summary: Redirects user to Facebook page. Then logins or registers user with it's Facebook account. In the end redirects user back to /auth/login so at this point they share logic
 *     tags:
 *       - Auth
 *     responses:
 *       '201':
 *         description: User is logined or registed with Facebook
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *             description: Location header with relative URL to logined/registered user
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
 * /auth/login/google:
 *   get:
 *     summary: Redirects user to Google login page. Then logins or registers user with it's Google account. In the end redirects user back to /auth/login so at this point they share logic
 *     tags:
 *       - Auth
 *     responses:
 *       '201':
 *         description: User is logined or registed with Google
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *             description: Location header with relative URL to logined/registered user
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