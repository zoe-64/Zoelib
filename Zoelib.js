/** make a junction or copy BC into the project
 * @typedef {import('../../Bondage-College/BondageClub/Scripts/Typedef')} 
 * @typedef {import('../../Bondage-College/BondageClub/Screens/Room/Crafting/Crafting')}
 */

var bcModSDK=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o))}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name)}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c}}return{hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router}return r}function d(){for(const o of i.values())o.precomputed=s(o)}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d()}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d())}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d()})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d()})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();
window.zoelibver = "0.1";

bcModSDK.registerMod({
    name: 'Zoelib',
    fullName: 'Zoelib',
    version: window.zoelibver,
    repository: '',
});

// this file is a bit unorganized


const pronounMap = {
    "HeHim": {"subjective": "he", "objective": "him", "dependent": "his", "independent": "his", "reflexive": "himself"},
    "SheHer": {"subjective": "she", "objective": "her", "dependent": "her", "independent": "hers", "reflexive": "herself"},
    "TheyThem": {"subjective": "they", "objective": "them", "dependent": "their", "independent": "theirs", "reflexive": "themself"},
    "ItIt": {"subjective": "it", "objective": "it", "dependent": "its", "independent": "its", "reflexive": "itself"}, // not sure if it's even used
};
/**
* @param {String} shape aka subjecive (they, she), objective (them, her),  depdendant (their, her), independent (theirs, hers), reflexive (themself, herself)
* @returns {String} pronoun
*/
export function Pronoun(shape) {
    let pronouns = Player.GetPronouns()
    return pronounMap[pronouns][shape.toLowerCase()]
}
/**
 * Retrieves the name of a character in the chat room based on their member number.
 * @param {number} [id=Player.MemberNumber] - The member number of the character. Defaults to the member number of the player.
 * @returns {string} - The name of the character if found, otherwise "Unknown".
 */
function GetName(id=Player.MemberNumber) {
    return ChatRoomCharacter.map(char => char.MemberNumber).includes(id) ? (ChatRoomCharacter.find(char => char.MemberNumber == id).Nickname || ChatRoomCharacter.find(char => char.MemberNumber == id).Name) : "Unknown";
}
/**
 * Retrieves a player character based on the provided identifier.
 * @param {string|number} identifier - The identifier of the player character.
 * @returns {object|null} - The player character object if found, otherwise null.
 */
function GetPlayer(identifier) {
    if (typeof identifier == "string") {
        identifier = identifier?.toLowerCase()
    }
    for (let character of ChatRoomCharacter) {
        if (character.MemberNumber == identifier) {
            return character
        }
        if (typeof identifier == "number") {continue}
        if (character.Name?.toLowerCase() == identifier) {
            return character
        }
        if (character.Nickname == "" || character.Nickname == null) {continue}
        if (character.Nickname?.toLowerCase() == identifier) {
            return character
        }
    }
    if (identifier == "random") {
        return ChatRoomCharacter[Math.floor(Math.random() * ChatRoomCharacter.length)]
    }
    console.error("Player not found: ", identifier)
    return null;
}


/**
 * Represents a ColorTransformer object that can convert colors between different formats.
 */
class ColorTransformer {
    constructor(color) {
        if (color.startsWith("#")) {
            this.hex = color;
            this.rgb = hexToRgb(color);
        }
        if (typeof color == "object") {
            this.rgb = rgb;
            this.hex = rgbToHex(rgb);
        }
    }

    /**
     * Converts a hexadecimal color code to an RGB array.
     * @param {string} hex - The hexadecimal color code.
     * @returns {number[]} The RGB array representing the color.
     */
    static hexToRgb(hex) {
        if (hex == "Default" || hex == "#") {
            hex = "#808080";
        }
        try {
            hex.replace(/^#/, '').match(/.{2}/g).map(x => parseInt(x, 16));
        } catch (e) {
            console.error(e);
            return [128, 128, 128];
        }
        return hex.replace(/^#/, '').match(/.{2}/g).map(x => parseInt(x, 16));
    }

    /**
     * Converts an RGB array to a hexadecimal color code.
     * @param {number[]} rgb - The RGB array representing the color.
     * @returns {string} The hexadecimal color code.
     */
    static rgbToHex([r, g, b]) {
        return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
    }

    /**
     * Calculates the average color between two hexadecimal color codes.
     * @param {string} hex1 - The first hexadecimal color code.
     * @param {string} hex2 - The second hexadecimal color code.
     * @param {number} [ratio=0.5] - The ratio of the two colors in the average calculation.
     * @returns {string} The hexadecimal color code representing the average color.
     */
    static averageColor(hex1, hex2, ratio = 0.5) {
        // Convert hex colors to RGB arrays
        let rgb1 = hexToRgb(hex1);
        let rgb2 = hexToRgb(hex2);

        // Calculate the weighted average RGB values based on the ratio
        let avgRgb = rgb1.map((x, i) => Math.round(x * ratio + rgb2[i] * (1 - ratio)));

        // Convert the average RGB values back to hex
        return rgbToHex(avgRgb);
    }
}


/**
 * Represents a local cache for storing data in the browser's localStorage.
 */
class LocalCache {
    /**
     * Creates a new instance of the LocalCache class.
     * @param {string} prefix - The prefix to use for the cache keys.
     */
    constructor(prefix) {
        this.prefix = prefix;
    }
    /**
     * Retrieves the value of a property from the cache.
     * @param {string} property - The name of the property to retrieve.
     * @param {*} [defaultValue=null] - The default value to return if the property is not found in the cache.
     * @returns {*} The value of the property from the cache, or the default value if not found.
     */
    get(property, defaultValue = null) {
        let data = JSON.parse(localStorage.getItem(`${this.prefix}-${Player.MemberNumber}`)) || {};
        return (typeof data[property] != 'undefined' &&  data[property] != null) ? data[property] : defaultValue;
    } 

    
    /**
     * Sets the value of a property in the cache.
     * @param {string} property - The name of the property to set.
     * @param {*} value - The value to set for the property.
     */
    set(property, value) {
        let data = JSON.parse(localStorage.getItem(`${this.prefix}-${Player.MemberNumber}`)) || {};
        data[property] = value;
        localStorage.setItem(`${this.prefix}-${Player.MemberNumber}`, JSON.stringify(data));
    }
}

// Lets you send messages and listen to messages in the chatroom
/**
 * Represents a messaging utility class.
 */
class Messager {
    constructor() {
        this.callbacks = [];
    }
    
    /**
     * Processes a response based on the specified criteria.
     * @param {Object} response - The response object to process.
     * @param {boolean} [isJson=true] - Indicates whether the response content is JSON.
     * @param {string} [type="Hidden"] - The type of the response.
     * @returns {Object|null} - The processed response object, or null if the response does not match the specified criteria.
     */
    static process(response, isJson = true, type = "Hidden") {
        if (response.Type != type) return null;
        if (isJson) {
            try {
                JSON.parse(response.Content);
            } catch (e) {
                return null;
            }
            const data = JSON.parse(response.Content);
            return {...data, ...response};
        }
        return response;
    }
    
    /**
     * Sends a JSON message to the specified target.
     * @param {Object} json - The JSON message to send.
     * @param {string} Target - The target of the message.
     * @param {string} [type="Hidden"] - The type of the message.
     */
    static send(json, Target, type = "Hidden") {
        ServerSend("ChatRoomChat", {Content:JSON.stringify(json), Type: type, Target: Target})
    }
    
    /**
     * Registers a message handler with the specified description, callback, and priority.
     * @param {string} description - The description of the message handler.
     * @param {Function} callback - The callback function to be executed when the message is received.
     * @param {number} [priority=-5] - The priority of the message handler.
     */
    register(description, callback, priority = -5) {
        ChatRoomRegisterMessageHandler({Description:description, Callback: callback, Priority: priority})
        this.callbacks.push(callback);
    }
}

//#region User
class User {
	static list = {}
	static get(memberNumber, create=false, IsStudent=null) {
        if (memberNumber == "random") {
            const userList = Object.values(User.list);
            return userList[randomInt(0, userList.length-1)];
        }
        
        let result = User.list[memberNumber];
        if (IsStudent == null) {
            result = Object.values(User.list).find(user => user.memberNumber == memberNumber);
        }
        if (result == null && create) {
            User.list[memberNumber] = new User(memberNumber);
            return User.list[memberNumber]
        }
		return result
	}
	constructor(memberNumber) {
		this.memberNumber = memberNumber;
		this.cache = new LocalCache("id-"+memberNumber+"-math-bot")
    }
	get name () {
		return GetName(this.memberNumber)
	}
	get player() {
		return GetPlayer(this.memberNumber)
	}
	wear(clothes, force=false,  by=Player.MemberNumber) {
		return wearItems(clothes, this.player, force, by)
	}
	setTag(value) {
		// check if the item is already there
		let red = "#ED8686"
		let green = "#8EEFB2"
		let collar = InventoryGet(this.player, "ItemNeck")
		if (collar == null) {
			let asset = AssetGet("Female3DCG","ItemNeck","LeatherCollar")
			let craftedItem = craftItem("Student Collar",sentencePrompter('§student-collar-description§', commonData, this.player), "#aaa366,#000000", "Normal", false, {},"", asset, {})
			collar = InventoryWear(this.player, asset.Name, asset.Group.Name, ['#aaa366', '#000000'], 10, Player.MemberNumber, craftedItem, true)
		}
		let tag = InventoryGet(this.player, "ItemNeckAccessories")
		if (tag == null) {
			let asset = AssetGet("Female3DCG","ItemNeckAccessories","CustomCollarTag")
			let craftedItem = craftItem("Student tag","", "#aaa366,#000000", "Normal", false, {},"", asset, {}) 
			tag = InventoryWear(this.player, asset.Name, asset.Group.Name, ['#aaa366', '#000000'], 10, Player.MemberNumber, craftedItem, true)
		}
		// if negative make tag red
		tag.Color[0] = value < 0 ? red : green
		tag.Property.Text = `${value}`.replace('-', 'neg')
		CharacterRefresh(this.player)	
		ChatRoomCharacterUpdate(this.player)
	}
	/**
	 * @param {AssetGroupName} group
	 * @param {ActivityName} action
	 */
	action(group, action) {
		let assetGroup = AssetGroupGet("Female3DCG", group)
		let itemActivity = {"Activity": AssetGetActivity("Female3DCG", action)};
		ActivityRun(Player, this.player, assetGroup, itemActivity, true)
	}
    remove() {
        User.list[this.memberNumber] = null

    }
}

/**
 * @param {String} name The name of the item.
 * @param {String} description The description of the item.
 * @param {String} color The color of the item.
 * @param {CraftingPropertyType} property The property of the item.
 * @param {Boolean} private Whether the item is private.
 * @param {ItemProperties | null} itemProperty The item property.
 * @param {CraftingLockList} lock The lock of the item.
 * @param {Asset} asset The asset of the item.
 * @param {TypeRecord | null} typeRecord The type record of the item.
 * @returns {CraftingItem} The crafted item.
 */
function craftItem(name, description, color, property, isPrivate=false, itemProperty=null, lock="", asset={Name:""}, typeRecord=null) {
	return {
		Item: asset.Name,
		Property: property,
		Lock: lock, 
		Name: name,
		Description: description,
		Color: color,
		Private: isPrivate,
		TypeRecord: typeRecord,
		ItemProperty: itemProperty,
	};
}
// data: {§name§: [options]}
class SentenceBuilder {
    static data = {
        "§dependent§": {get neutral() {return [Pronoun("dependent")]}},
        "§subjective§": {get neutral() {return [Pronoun("subjective")]}},
        "§objective§": {get neutral() {return [Pronoun("objective")]}},
        "§independent§": {get neutral() {return [Pronoun("independent")]}},
        "§reflexive§": {get neutral() {return [Pronoun("reflexive")]}},
    }
/**
 * Replaces the keys in the sentence with the values in the data object.
 * 
 * @param {string} sentence - The sentence to be prompted.
 * @param {Character} [player=Player] - The player character to prompt the sentence to.
 * @returns {string} The prompted sentence.
 */
    static prompt(sentence, player=Player) {
        let pronoun = {"SheHer":"female", "HeHim":"male"}[player.GetPronouns()]
        let sentenceKeys = sentence.match(/§[a-zA-Z-]*§/g)
        for (let key of sentenceKeys) {
            if (!SentenceBuilder.data.hasOwnProperty(key)) {
                throw new Error(`The key ${key} is not in the data object`)
            }
            let options = [
                ...typeof SentenceBuilder.data[key][pronoun] != 'undefined' ? SentenceBuilder.data[key][pronoun] : [],
                ...typeof SentenceBuilder.data[key].neutral != 'undefined' ? SentenceBuilder.data[key].neutral : []]
            sentence = sentence.replaceAll(key, options[randomInt(0, options.length-1)]);
        }
        
        if (sentence.match(/§[a-zA-Z-]*§/g)) {
            return SentenceBuilder.prompt(sentence, player);
        }
        return sentence;
    }
}
let zoelibData = {}
async function _() {
    zoelibData = await getJson(document.querySelector("#BotruntimeID").innerHTML+"zoelib.json")
    SentenceBuilder.data = {...SentenceBuilder.data, ...zoelibData.vocab}
}
_()
/**
 * Wears the specified items on the player character.
 * 
 * @param {{
 * AssetName: string, 
 * AssetGroupName: AssetGroupName, 
 * Color: string | string[] | null, 
 * Difficulty: number | null, 
 * Craft: CraftingItem | null, 
 * Property: ItemProperties | null}[]} items - The items to be worn.
 * @param {Character} [player=Player] - The player character to wear the items on.
 * @param {boolean} [force=false] - Indicates whether to force wearing the items even if they are locked.
 * @param {number} [by=Player.MemberNumber] - The member who put the items on the player character.
*/
function wearItems(items, player=Player, force=false, by=Player.MemberNumber) {
    let NewItems = [];
    for (let item of items) {
        
        const currentLock = InventoryGet(player, item.AssetGroup)?.Property?.LockedBy;
        if (currentLock && !force) {
            return;
        }
        let newItem = InventoryWear(player, item.Name, item.Group, item.Color, item.Difficulty || 10, by, );
        
        if (item?.Property?.LockedBy) {
            InventoryLock(player, newItem, {"Asset":AssetGet("Female3DCG","ItemMisc",item.Property.LockedBy)}, by, true);
            newItem.Property = {...newItem.Property, ...item.Property}
        }
        NewItems.push(newItem);
    }
    CharacterRefresh(player)	
    ChatRoomCharacterUpdate(player)
    return NewItems;
}
console.log("Zoelib.js loaded");


// Basic functions ---------------------------------------------------------

/**
 * Generates a random string of the specified length.
 *
 * @param {number} length - The length of the random string to generate.
 * @returns {string} The randomly generated string.
 */
export function randomString(length) {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from({ length: length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

/**
 * Fetches JSON data from the specified URL.
 * @param {string} url - The URL to fetch JSON data from.
 * @returns {Promise<any>} - A promise that resolves to the JSON data.
 */
export async function getJson(url) {
    return fetch(url).then(response => response.json());
}

/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 *
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {number} The randomly generated integer.
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// this might be a strange thing to have but it's useful as a smooth randomizer
