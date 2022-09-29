/**
 * @swagger
 * /posts/{postId}/comments:
 *   get:
 *     summary: Returns the list of all comments below post by given id
 *     tags:
 *       - Posts
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/postIdParameter'
 *     responses:
 *       '200':
 *         description: Post is found and list of all comments is returned
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
 *                   required: comments
 *                   properties:
 *                     comments:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Comment'
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
 * /posts/{postId}/comments:
 *   post:
 *     summary: Post comment below post by given id
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
 *                 description: Content of the comment
 *                 minLength: 1
 *                 maxLength: 100
 *     responses:
 *       '201':
 *         description: Post is found and comment is posted below it
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *             description: Location header with relative URL to created comment
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
 *       '404':
 *         $ref: '#/components/responses/404Error'
 *       '500':
 *         $ref: '#/components/responses/500Error'
 * 
 */

/**
 * @swagger
 * /posts/{postId}/comments/{commentId}:
 *   put:
 *     summary: Get comment by given id below post by given id
 *     tags:
 *       - Posts
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/postIdParameter'
 *       - $ref: '#/components/parameters/commentIdParameter' 
 *     responses:
 *       '200':
 *         description: Post and comment are found and comment is returned
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
 *                     - comment
 *                   properties:
 *                     comment:
 *                       $ref: '#/components/schemas/ExtendedCommentOutput'
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
 * /posts/{postId}/comments/{commentId}:
 *   put:
 *     summary: Update comment by given id below post by given id
 *     tags:
 *       - Posts
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/postIdParameter'
 *       - $ref: '#/components/parameters/commentIdParameter' 
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
 *                 description: Content of the comment
 *                 minLength: 1
 *                 maxLength: 100
 *     responses:
 *       '200':
 *         description: Post and comment are found, authorized user is comment author and comment is updated
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
 *                     - comment
 *                   properties:
 *                     comment:
 *                       $ref: '#/components/schemas/Comment'
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
 * /posts/{postId}/comments/{commentId}:
 *   delete:
 *     summary: Delete comment by given id below post by given id
 *     tags:
 *       - Posts
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/postIdParameter'
 *       - $ref: '#/components/parameters/commentIdParameter' 
 *     responses:
 *       '200':
 *         description: Post and comment are found, authorized user is comment author and comment is deleted
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
  * /posts/{postId}/comments/{commentId}/likes:
  *   post:
  *     summary: Cretates like by authorized user as author below coment by given id that is below post by given id
  *     tags:
  *       - Posts
  *     security:
  *       - $ref: '#/components/securitySchemes/bearerAuthorization'
  *     parameters:
  *       - $ref: '#/components/parameters/postIdParameter'
  *       - $ref: '#/components/parameters/commentIdParameter' 
  *     responses:
  *       '201':
  *         description: Post and comment are found, like is created
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
 * /posts/{postId}/comments/{commentId}/likes:
 *   delete:
 *     summary: Deletes like by authorized user as author below coment by given id that is below post by given id
 *     tags:
 *       - Posts
 *     security:
 *       - $ref: '#/components/securitySchemes/bearerAuthorization'
 *     parameters:
 *       - $ref: '#/components/parameters/postIdParameter'
 *       - $ref: '#/components/parameters/commentIdParameter' 
 *     responses:
 *       '200':
 *         description: Post and comment are found, like is deleted
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