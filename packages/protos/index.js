/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.PostProto = (function() {

    /**
     * Namespace PostProto.
     * @exports PostProto
     * @namespace
     */
    var PostProto = {};

    PostProto.Summary = (function() {

        /**
         * Properties of a Summary.
         * @memberof PostProto
         * @interface ISummary
         * @property {string} title Summary title
         * @property {string} date Summary date
         * @property {string} content Summary content
         * @property {string} uid Summary uid
         */

        /**
         * Constructs a new Summary.
         * @memberof PostProto
         * @classdesc Represents a Summary.
         * @implements ISummary
         * @constructor
         * @param {PostProto.ISummary=} [properties] Properties to set
         */
        function Summary(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Summary title.
         * @member {string} title
         * @memberof PostProto.Summary
         * @instance
         */
        Summary.prototype.title = "";

        /**
         * Summary date.
         * @member {string} date
         * @memberof PostProto.Summary
         * @instance
         */
        Summary.prototype.date = "";

        /**
         * Summary content.
         * @member {string} content
         * @memberof PostProto.Summary
         * @instance
         */
        Summary.prototype.content = "";

        /**
         * Summary uid.
         * @member {string} uid
         * @memberof PostProto.Summary
         * @instance
         */
        Summary.prototype.uid = "";

        /**
         * Creates a new Summary instance using the specified properties.
         * @function create
         * @memberof PostProto.Summary
         * @static
         * @param {PostProto.ISummary=} [properties] Properties to set
         * @returns {PostProto.Summary} Summary instance
         */
        Summary.create = function create(properties) {
            return new Summary(properties);
        };

        /**
         * Encodes the specified Summary message. Does not implicitly {@link PostProto.Summary.verify|verify} messages.
         * @function encode
         * @memberof PostProto.Summary
         * @static
         * @param {PostProto.ISummary} message Summary message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Summary.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.title);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.date);
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.content);
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.uid);
            return writer;
        };

        /**
         * Encodes the specified Summary message, length delimited. Does not implicitly {@link PostProto.Summary.verify|verify} messages.
         * @function encodeDelimited
         * @memberof PostProto.Summary
         * @static
         * @param {PostProto.ISummary} message Summary message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Summary.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Summary message from the specified reader or buffer.
         * @function decode
         * @memberof PostProto.Summary
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PostProto.Summary} Summary
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Summary.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PostProto.Summary();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.title = reader.string();
                    break;
                case 2:
                    message.date = reader.string();
                    break;
                case 3:
                    message.content = reader.string();
                    break;
                case 4:
                    message.uid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("title"))
                throw $util.ProtocolError("missing required 'title'", { instance: message });
            if (!message.hasOwnProperty("date"))
                throw $util.ProtocolError("missing required 'date'", { instance: message });
            if (!message.hasOwnProperty("content"))
                throw $util.ProtocolError("missing required 'content'", { instance: message });
            if (!message.hasOwnProperty("uid"))
                throw $util.ProtocolError("missing required 'uid'", { instance: message });
            return message;
        };

        /**
         * Decodes a Summary message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof PostProto.Summary
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {PostProto.Summary} Summary
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Summary.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Summary message.
         * @function verify
         * @memberof PostProto.Summary
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Summary.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.title))
                return "title: string expected";
            if (!$util.isString(message.date))
                return "date: string expected";
            if (!$util.isString(message.content))
                return "content: string expected";
            if (!$util.isString(message.uid))
                return "uid: string expected";
            return null;
        };

        /**
         * Creates a Summary message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PostProto.Summary
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PostProto.Summary} Summary
         */
        Summary.fromObject = function fromObject(object) {
            if (object instanceof $root.PostProto.Summary)
                return object;
            var message = new $root.PostProto.Summary();
            if (object.title != null)
                message.title = String(object.title);
            if (object.date != null)
                message.date = String(object.date);
            if (object.content != null)
                message.content = String(object.content);
            if (object.uid != null)
                message.uid = String(object.uid);
            return message;
        };

        /**
         * Creates a plain object from a Summary message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PostProto.Summary
         * @static
         * @param {PostProto.Summary} message Summary
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Summary.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.title = "";
                object.date = "";
                object.content = "";
                object.uid = "";
            }
            if (message.title != null && message.hasOwnProperty("title"))
                object.title = message.title;
            if (message.date != null && message.hasOwnProperty("date"))
                object.date = message.date;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            return object;
        };

        /**
         * Converts this Summary to JSON.
         * @function toJSON
         * @memberof PostProto.Summary
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Summary.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Summary;
    })();

    PostProto.SummrayList = (function() {

        /**
         * Properties of a SummrayList.
         * @memberof PostProto
         * @interface ISummrayList
         * @property {Array.<PostProto.ISummary>|null} [list] SummrayList list
         * @property {number} count SummrayList count
         */

        /**
         * Constructs a new SummrayList.
         * @memberof PostProto
         * @classdesc Represents a SummrayList.
         * @implements ISummrayList
         * @constructor
         * @param {PostProto.ISummrayList=} [properties] Properties to set
         */
        function SummrayList(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SummrayList list.
         * @member {Array.<PostProto.ISummary>} list
         * @memberof PostProto.SummrayList
         * @instance
         */
        SummrayList.prototype.list = $util.emptyArray;

        /**
         * SummrayList count.
         * @member {number} count
         * @memberof PostProto.SummrayList
         * @instance
         */
        SummrayList.prototype.count = 0;

        /**
         * Creates a new SummrayList instance using the specified properties.
         * @function create
         * @memberof PostProto.SummrayList
         * @static
         * @param {PostProto.ISummrayList=} [properties] Properties to set
         * @returns {PostProto.SummrayList} SummrayList instance
         */
        SummrayList.create = function create(properties) {
            return new SummrayList(properties);
        };

        /**
         * Encodes the specified SummrayList message. Does not implicitly {@link PostProto.SummrayList.verify|verify} messages.
         * @function encode
         * @memberof PostProto.SummrayList
         * @static
         * @param {PostProto.ISummrayList} message SummrayList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SummrayList.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.PostProto.Summary.encode(message.list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.count);
            return writer;
        };

        /**
         * Encodes the specified SummrayList message, length delimited. Does not implicitly {@link PostProto.SummrayList.verify|verify} messages.
         * @function encodeDelimited
         * @memberof PostProto.SummrayList
         * @static
         * @param {PostProto.ISummrayList} message SummrayList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SummrayList.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SummrayList message from the specified reader or buffer.
         * @function decode
         * @memberof PostProto.SummrayList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PostProto.SummrayList} SummrayList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SummrayList.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PostProto.SummrayList();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.PostProto.Summary.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.count = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("count"))
                throw $util.ProtocolError("missing required 'count'", { instance: message });
            return message;
        };

        /**
         * Decodes a SummrayList message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof PostProto.SummrayList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {PostProto.SummrayList} SummrayList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SummrayList.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SummrayList message.
         * @function verify
         * @memberof PostProto.SummrayList
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SummrayList.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.PostProto.Summary.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            if (!$util.isInteger(message.count))
                return "count: integer expected";
            return null;
        };

        /**
         * Creates a SummrayList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PostProto.SummrayList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PostProto.SummrayList} SummrayList
         */
        SummrayList.fromObject = function fromObject(object) {
            if (object instanceof $root.PostProto.SummrayList)
                return object;
            var message = new $root.PostProto.SummrayList();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".PostProto.SummrayList.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".PostProto.SummrayList.list: object expected");
                    message.list[i] = $root.PostProto.Summary.fromObject(object.list[i]);
                }
            }
            if (object.count != null)
                message.count = object.count | 0;
            return message;
        };

        /**
         * Creates a plain object from a SummrayList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PostProto.SummrayList
         * @static
         * @param {PostProto.SummrayList} message SummrayList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SummrayList.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (options.defaults)
                object.count = 0;
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.PostProto.Summary.toObject(message.list[j], options);
            }
            if (message.count != null && message.hasOwnProperty("count"))
                object.count = message.count;
            return object;
        };

        /**
         * Converts this SummrayList to JSON.
         * @function toJSON
         * @memberof PostProto.SummrayList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SummrayList.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SummrayList;
    })();

    PostProto.Post = (function() {

        /**
         * Properties of a Post.
         * @memberof PostProto
         * @interface IPost
         * @property {string} title Post title
         * @property {string} date Post date
         * @property {string} content Post content
         */

        /**
         * Constructs a new Post.
         * @memberof PostProto
         * @classdesc Represents a Post.
         * @implements IPost
         * @constructor
         * @param {PostProto.IPost=} [properties] Properties to set
         */
        function Post(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Post title.
         * @member {string} title
         * @memberof PostProto.Post
         * @instance
         */
        Post.prototype.title = "";

        /**
         * Post date.
         * @member {string} date
         * @memberof PostProto.Post
         * @instance
         */
        Post.prototype.date = "";

        /**
         * Post content.
         * @member {string} content
         * @memberof PostProto.Post
         * @instance
         */
        Post.prototype.content = "";

        /**
         * Creates a new Post instance using the specified properties.
         * @function create
         * @memberof PostProto.Post
         * @static
         * @param {PostProto.IPost=} [properties] Properties to set
         * @returns {PostProto.Post} Post instance
         */
        Post.create = function create(properties) {
            return new Post(properties);
        };

        /**
         * Encodes the specified Post message. Does not implicitly {@link PostProto.Post.verify|verify} messages.
         * @function encode
         * @memberof PostProto.Post
         * @static
         * @param {PostProto.IPost} message Post message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Post.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.title);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.date);
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.content);
            return writer;
        };

        /**
         * Encodes the specified Post message, length delimited. Does not implicitly {@link PostProto.Post.verify|verify} messages.
         * @function encodeDelimited
         * @memberof PostProto.Post
         * @static
         * @param {PostProto.IPost} message Post message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Post.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Post message from the specified reader or buffer.
         * @function decode
         * @memberof PostProto.Post
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PostProto.Post} Post
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Post.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PostProto.Post();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.title = reader.string();
                    break;
                case 2:
                    message.date = reader.string();
                    break;
                case 3:
                    message.content = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("title"))
                throw $util.ProtocolError("missing required 'title'", { instance: message });
            if (!message.hasOwnProperty("date"))
                throw $util.ProtocolError("missing required 'date'", { instance: message });
            if (!message.hasOwnProperty("content"))
                throw $util.ProtocolError("missing required 'content'", { instance: message });
            return message;
        };

        /**
         * Decodes a Post message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof PostProto.Post
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {PostProto.Post} Post
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Post.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Post message.
         * @function verify
         * @memberof PostProto.Post
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Post.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.title))
                return "title: string expected";
            if (!$util.isString(message.date))
                return "date: string expected";
            if (!$util.isString(message.content))
                return "content: string expected";
            return null;
        };

        /**
         * Creates a Post message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PostProto.Post
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PostProto.Post} Post
         */
        Post.fromObject = function fromObject(object) {
            if (object instanceof $root.PostProto.Post)
                return object;
            var message = new $root.PostProto.Post();
            if (object.title != null)
                message.title = String(object.title);
            if (object.date != null)
                message.date = String(object.date);
            if (object.content != null)
                message.content = String(object.content);
            return message;
        };

        /**
         * Creates a plain object from a Post message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PostProto.Post
         * @static
         * @param {PostProto.Post} message Post
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Post.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.title = "";
                object.date = "";
                object.content = "";
            }
            if (message.title != null && message.hasOwnProperty("title"))
                object.title = message.title;
            if (message.date != null && message.hasOwnProperty("date"))
                object.date = message.date;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            return object;
        };

        /**
         * Converts this Post to JSON.
         * @function toJSON
         * @memberof PostProto.Post
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Post.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Post;
    })();

    return PostProto;
})();

module.exports = $root;
