import * as $protobuf from "protobufjs";
/** Namespace PostProto. */
export namespace PostProto {

    /** Properties of a Summary. */
    interface ISummary {

        /** Summary title */
        title: string;

        /** Summary date */
        date: string;

        /** Summary content */
        content: string;

        /** Summary uid */
        uid: string;
    }

    /** Represents a Summary. */
    class Summary implements ISummary {

        /**
         * Constructs a new Summary.
         * @param [properties] Properties to set
         */
        constructor(properties?: PostProto.ISummary);

        /** Summary title. */
        public title: string;

        /** Summary date. */
        public date: string;

        /** Summary content. */
        public content: string;

        /** Summary uid. */
        public uid: string;

        /**
         * Creates a new Summary instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Summary instance
         */
        public static create(properties?: PostProto.ISummary): PostProto.Summary;

        /**
         * Encodes the specified Summary message. Does not implicitly {@link PostProto.Summary.verify|verify} messages.
         * @param message Summary message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: PostProto.ISummary, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Summary message, length delimited. Does not implicitly {@link PostProto.Summary.verify|verify} messages.
         * @param message Summary message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: PostProto.ISummary, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Summary message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Summary
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PostProto.Summary;

        /**
         * Decodes a Summary message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Summary
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PostProto.Summary;

        /**
         * Verifies a Summary message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Summary message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Summary
         */
        public static fromObject(object: { [k: string]: any }): PostProto.Summary;

        /**
         * Creates a plain object from a Summary message. Also converts values to other types if specified.
         * @param message Summary
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: PostProto.Summary, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Summary to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SummrayList. */
    interface ISummrayList {

        /** SummrayList list */
        list?: (PostProto.ISummary[]|null);

        /** SummrayList count */
        count: number;
    }

    /** Represents a SummrayList. */
    class SummrayList implements ISummrayList {

        /**
         * Constructs a new SummrayList.
         * @param [properties] Properties to set
         */
        constructor(properties?: PostProto.ISummrayList);

        /** SummrayList list. */
        public list: PostProto.ISummary[];

        /** SummrayList count. */
        public count: number;

        /**
         * Creates a new SummrayList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SummrayList instance
         */
        public static create(properties?: PostProto.ISummrayList): PostProto.SummrayList;

        /**
         * Encodes the specified SummrayList message. Does not implicitly {@link PostProto.SummrayList.verify|verify} messages.
         * @param message SummrayList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: PostProto.ISummrayList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SummrayList message, length delimited. Does not implicitly {@link PostProto.SummrayList.verify|verify} messages.
         * @param message SummrayList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: PostProto.ISummrayList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SummrayList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SummrayList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PostProto.SummrayList;

        /**
         * Decodes a SummrayList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SummrayList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PostProto.SummrayList;

        /**
         * Verifies a SummrayList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SummrayList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SummrayList
         */
        public static fromObject(object: { [k: string]: any }): PostProto.SummrayList;

        /**
         * Creates a plain object from a SummrayList message. Also converts values to other types if specified.
         * @param message SummrayList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: PostProto.SummrayList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SummrayList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
