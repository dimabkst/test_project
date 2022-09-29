/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Returns the list of all posts
 *     tags:
 *       - Posts
 *     responses:
 *       '200':
 *         description: List of all posts is returned
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
 *                   required: posts
 *                   properties:
 *                     posts:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Post'
 *       '500':
 *         $ref: '#/components/responses/500Error'
 * 
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cretates post with given body and authorized user as author
 *     tags:
 *       - Posts
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Content of the post
 *                 minLength: 1
 *                 maxLength: 1000
 *     responses:
 *       '201':
 *         description: Post is created
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *             description: Location header with relative URL to created Post
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
 * /posts/{postId}:
 *   get:
 *     summary: Returns post by given id
 *     tags:
 *       - Posts
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/postIdParameter'
 *     responses:
 *       '200':
 *         description: Post is found and returned
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
 *                     - post
 *                   properties:
 *                     post:
 *                       $ref: '#/components/schemas/ExtendedPostOutput'
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
 * /posts/{postId}:
 *   put:
 *     summary: Updatets post by given id if user is an author
 *     tags:
 *       - Posts
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/postIdParameter'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Content of the post
 *                 minLength: 1
 *                 maxLength: 1000
 *     responses:
 *       '200':
 *         description: Post is found and updated
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
 *                     - post
 *                   properties:
 *                     post:
 *                       $ref: '#/components/schemas/Post'
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
 * /posts/{postId}:
 *   delete:
 *     summary: Deletes post by given id if user is an author
 *     tags:
 *       - Posts
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/postIdParameter'
 *     responses:
 *       '200':
 *         description: Post is found and deleted
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

/**
 * @swagger
 * /posts/users/{userId}:
 *   get:
 *     summary: Returns all posts of user by given id
 *     tags:
 *       - Posts
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParameter'
 *     responses:
 *       '200':
 *         description: User is found and it's posts returned
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
 *                   required: posts
 *                   properties:
 *                     posts:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Post'
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
 * /posts/{postId}/likes:
 *   post:
 *     summary: Cretates like by authorized user as author below post by given id
 *     tags:
 *       - Posts
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/postIdParameter'
 *     responses:
 *       '201':
 *         description: Like is created
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
 *                   type: integer
 *                   example: null
 *          
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
 * /posts/{postId}/likes:
 *   delete:
 *     summary: Deletes like by authorized user as author below post by given id
 *     tags:
 *       - Posts
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/postIdParameter'
 *     responses:
 *       '200':
 *         description: Like is deleted
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
 *          
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
 * /posts/feed/{userId}:
 *   get:
 *     summary: Returns feed for user by given id
 *     tags:
 *       - Posts
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParameter'
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *     responses:
 *       '200':
 *         description: User is found and feed for him is returned
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
 *                   required: feed
 *                   properties:
 *                     feed:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Post'
 * 
 *       '400':
 *         $ref: '#/components/responses/400Error'
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