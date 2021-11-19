# Dictionary/map system in C
## Overview
1. [Inspiration](#inspiration)
    - [JavaScript](#javascript)
    - [Lua](#lua)
    - [C#](#c#)
2. [General Idea](#general-idea)
3. [Implementation in C](#implementation-in-c)
    - [The KeyValue Struct](#the-keyvalue-struct)
    - [The Map Struct](#the-map-struct)
    - [Preventing Access Violations](#preventing-access-violations)

# Inspiration
The idea of a Dictionary/map system was inspired, initially, by scripting languages.
## JavaScript
For example, JavaScript can dynamically store values in an object _(or array, they're basically the same)_, and can access them both by doing `dict.key` and `dict["key"]`.

```js
let dict = {
    keyInit = 1
};

dict.keyDot = true;

for (let i = 0; i < 16; i++)
{
    dict["key" + i] = "abcd"; // key0, key1...
}
```

## Lua
Another scripting language that implements this, and is based upon the idea of it, is Lua. The `_G` table, also called the **environment**, stores all variables, functions, tables, etcetera.

```lua
a = 42
print(a == _G["a"]) -- true

_G["a"] = 8
print(a == _G["a"]) -- true

_G["print"]("This works!") -- This works!
```
_Note: Manipulating the \_G table is usually not recommended._

## C#
And, finally, a compiled language that implements this system as well and was inspired by is C#. Albeit, regular arrays do not possess the feature of indexing by string. A dedicated `Dictionary<TKey,TValue>` class is designed for this purpose:

```cs
Dictionary<string, string> favoriteFoods = new Dictionary<string, string>();
favoriteFoods.Add("Barney", "French Fries"); // by function
favoriteFoods["Garfield"] = "Lasagna"; // by index
```

# General Idea
**STUB**
# Implementation in C
**STUB**
## The KeyValue Struct
**STUB**
## The Map Struct
**STUB**
## Preventing Access Violations
**STUB**
