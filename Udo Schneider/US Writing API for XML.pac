| package |
package := Package name: 'US Writing API for XML'.
package paxVersion: 1;
	basicComment: '$id: US Writing API for XML 0.008$
$for: Dolphin Smalltalk X6.1 Beta 2$

(c) $date: 24.07.2009$, $developer: udos@udos-laptop$ <Udo.Schneider@homeaddress.de>
Public Domain, Freeware

Based on "WAX-RMV.7.mcz" (2008-10-22 03:23:01) from the "Writing API for XML" Project on Squeak Source:
http://www.squeaksource.com/@WKdv9M7Ta-2KxKvg/ds0z_a21

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'.

package basicPackageVersion: '0.008'.


package classNames
	add: #CDDemo;
	add: #IllegalArgumentException;
	add: #IllegalStateException;
	add: #State;
	add: #WAX;
	add: #XMLUtil;
	yourself.

package binaryGlobalNames: (Set new
	yourself).

package globalAliases: (Set new
	yourself).

package setPrerequisites: (IdentitySet new
	add: '..\..\Object Arts\Dolphin\Base\Dolphin';
	add: 'US Collection Extensions';
	yourself).

package setManualPrerequisites: #(
	'US Collection Extensions').

package!

"Class Definitions"!

Object subclass: #CDDemo
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #State
	instanceVariableNames: ''
	classVariableNames: 'AfterRoot InElement InProlog InStartTag'
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #WAX
	instanceVariableNames: 'attrOnNewLine checkMe closeStream defaultNSOnCurrentElement doctypePublicId doctypeSystemId dtdSpecified encoding entityDefs escape hasContent hasIndentedContent inCommentedStart indent lineSeparator namespaceURIToSchemaPathMap outputStarted parentStack pendingPrefixes prefixesStack spaceInEmptyElements state stream xsltSpecified'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #XMLUtil
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Error subclass: #IllegalArgumentException
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Error subclass: #IllegalStateException
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!

"Global Aliases"!


"Loose Methods"!

"End of package definition"!

"Source Globals"!

"Classes"!

CDDemo guid: (GUID fromString: '{44BDD8E4-9BC6-41AA-B7F3-22822483FE98}')!
CDDemo comment: 'This class demonstrates use of the WAX library.'!
!CDDemo categoriesForClass!Unclassified! !
!CDDemo class methodsFor!

main
!CDDemo class categoriesFor: #main!public! !

State guid: (GUID fromString: '{8B94676B-FCFE-406F-AB22-E19366F3934A}')!
State comment: 'This represents the state of a WAX object.
!State categoriesForClass!Unclassified! !
!State class methodsFor!

afterRoot

inElement

initialize

inProlog

inStartTag
!State class categoriesFor: #afterRoot!accessing!public! !
!State class categoriesFor: #inElement!accessing!public! !
!State class categoriesFor: #initialize!initialize/release!public! !
!State class categoriesFor: #inProlog!accessing!public! !
!State class categoriesFor: #inStartTag!accessing!public! !

WAX guid: (GUID fromString: '{430E050E-DF44-4E24-B953-6E8EB22D14D8}')!
WAX comment: 'This is the main class of the Writing API for XML (WAX) implementation.'!
!WAX categoriesForClass!Unclassified! !
!WAX methodsFor!

allSpaces: aString

attr: aName value: aValue 

badState: aMethodName

blankLine

cdata: aString 

cdata: aString newline: aBoolean

child: anElementName text: aString

close

comment: aString 

comment: aString newline: aBoolean

commentedStart: anElementName 

defaultNamespace: aURI

defaultNamespace: aURI schemaPath: aPath

dtd: systemId

dtd: publicId systemId: systemId

end

end: verbose

entityDef: aName value: aString

externalEntityDef: aName filePath: aFilePath

indent

indentChars: aStringOrChar 
	"Sets the indentation characters to use.

	" causes elements to be output on separate lines, but not indented.

	| string |
	string := aStringOrChar asString.
	checkMe 
		ifTrue: 
			[| valid |
			valid := string isEmptyOrNil or: [(aStringOrChar = Character tab) or: [self allSpaces: string]].
			(valid not or: [string notNil and: [string size > 4]]) 
				ifTrue: [IllegalArgumentException signal: 'invalid indent value']].
	indent := string!

indentSize: anInteger

initialize

isInScopePrefix: aPrefix

isSpaceInEmptyElements

lineSeparator

lineSeparator: aLineSeparator

noIndentsOrLineSeparators

pi: target data: data

prefix: aPrefix attr: aName value: aValue 

prefix: aPrefix attr: aName value: aValue newline: aBoolean 
	"add an attribute to the current element"

	| hasPrefix qName value |
	state = #InStartTag ifFalse: [self badState: 'attr'].
	hasPrefix := aPrefix ~= nil and: [aPrefix size > 0].
	checkMe 
		ifTrue: 
			[hasPrefix 
				ifTrue: 
					[XMLUtil verifyName: aPrefix.
					pendingPrefixes add: aPrefix].
			XMLUtil verifyName: aName].
	qName := hasPrefix ifFalse: [aName] ifTrue: [aPrefix , ':' , aName]  .
	aBoolean ifTrue: [self writeIndent] ifFalse: [self write: ' '].
	value := escape ifTrue: [XMLUtil escape: aValue] ifFalse: [aValue].
	self write: qName , '="' , value , '"'!

prefix: aPrefix child: anElementName text: aString

prefix: aPrefix commentedStart: anElementName 

prefix: aPrefix namespace: aURI

prefix: aPrefix namespace: aURI schemaPath: aPath

prefix: aPrefix ns: aURI

prefix: aPrefix ns: aURI schemaPath: aPath

prefix: aPrefix start: anElementName 

prefix: aPrefix unescapedAttr: aName value: aValue

prefix: aPrefix unescapedAttr: aName value: aValue newline: aBoolean

processingInstruction: target data: data

spaceInEmptyElements: aBoolean

start: anElementName 

stream

stream: aStream

terminateStart

text: aString 

text: aString newline: newline

trustMe

trustMe: aBoolean

unescapedAttr: aName value: aValue

unescapedText: text

unescapedText: text newline: aBoolean

verifyPrefixes

willIndent

write: aString 

writeDocType: rootElementName 

writeIndent

writeSchemaLocations
	"Private - write the namespace declaration for the XMLSchema-instance namespace

	| nsStream |
	
	namespaceURIToSchemaPathMap ifEmpty: [^self].

	"Write the attributes needed to associate XML Schemas with this XML."
	nsStream := WriteStream on: String new.
	namespaceURIToSchemaPathMap keysAndValuesDo: 
			[:uri :path | 
			"If not the first pair output ..."
			nsStream isEmpty 
				ifFalse: 
					[self willIndent 
						ifTrue: 
							[nsStream nextPutAll: lineSeparator.
							parentStack size + 1 timesRepeat: [nsStream nextPutAll: indent]]
						ifFalse: [nsStream nextPut: Character space]].
			nsStream nextPutAll: uri , ' ' , path].
	self
		prefix: 'xsi' namespace: XMLUtil xmlSchemaInstanceNS;
		prefix: 'xsi'
			attr: 'schemaLocation'
			value: nsStream contents
			newline: self willIndent.
	attrOnNewLine := true.	"for the next attribute"
	namespaceURIToSchemaPathMap := Dictionary new!

writeXMLDeclaration: aVersion 

xslt: filePath
!WAX categoriesFor: #allSpaces:!private! !
!WAX categoriesFor: #attr:value:!public!writing! !
!WAX categoriesFor: #badState:!error/handling!public! !
!WAX categoriesFor: #blankLine!public!writing! !
!WAX categoriesFor: #cdata:!public!writing! !
!WAX categoriesFor: #cdata:newline:!public!writing! !
!WAX categoriesFor: #child:text:!public!writing! !
!WAX categoriesFor: #close!public!writing! !
!WAX categoriesFor: #comment:!public!writing! !
!WAX categoriesFor: #comment:newline:!public!writing! !
!WAX categoriesFor: #commentedStart:!public!writing! !
!WAX categoriesFor: #defaultNamespace:!public!writing! !
!WAX categoriesFor: #defaultNamespace:schemaPath:!public!writing! !
!WAX categoriesFor: #dtd:!public!writing! !
!WAX categoriesFor: #dtd:systemId:!public!writing! !
!WAX categoriesFor: #end!public!writing! !
!WAX categoriesFor: #end:!public!writing! !
!WAX categoriesFor: #entityDef:value:!public!writing! !
!WAX categoriesFor: #externalEntityDef:filePath:!public!writing! !
!WAX categoriesFor: #indent!configuring!public! !
!WAX categoriesFor: #indentChars:!configuring!public! !
!WAX categoriesFor: #indentSize:!configuring!public! !
!WAX categoriesFor: #initialize!initialize/release!public! !
!WAX categoriesFor: #isInScopePrefix:!private! !
!WAX categoriesFor: #isSpaceInEmptyElements!private! !
!WAX categoriesFor: #lineSeparator!accessing!public! !
!WAX categoriesFor: #lineSeparator:!configuring!public! !
!WAX categoriesFor: #noIndentsOrLineSeparators!configuring!public! !
!WAX categoriesFor: #pi:data:!public!writing! !
!WAX categoriesFor: #prefix:attr:value:!public!writing! !
!WAX categoriesFor: #prefix:attr:value:newline:!public!writing! !
!WAX categoriesFor: #prefix:child:text:!public!writing! !
!WAX categoriesFor: #prefix:commentedStart:!public!writing! !
!WAX categoriesFor: #prefix:namespace:!public!writing! !
!WAX categoriesFor: #prefix:namespace:schemaPath:!public!writing! !
!WAX categoriesFor: #prefix:ns:!public!writing! !
!WAX categoriesFor: #prefix:ns:schemaPath:!public!writing! !
!WAX categoriesFor: #prefix:start:!public!writing! !
!WAX categoriesFor: #prefix:unescapedAttr:value:!public!writing! !
!WAX categoriesFor: #prefix:unescapedAttr:value:newline:!public!writing! !
!WAX categoriesFor: #processingInstruction:data:!public!writing! !
!WAX categoriesFor: #spaceInEmptyElements:!private! !
!WAX categoriesFor: #start:!public!writing! !
!WAX categoriesFor: #stream!accessing!public! !
!WAX categoriesFor: #stream:!accessing!public! !
!WAX categoriesFor: #terminateStart!private! !
!WAX categoriesFor: #text:!public!writing! !
!WAX categoriesFor: #text:newline:!public!writing! !
!WAX categoriesFor: #trustMe!configuring!public! !
!WAX categoriesFor: #trustMe:!configuring!public! !
!WAX categoriesFor: #unescapedAttr:value:!public!writing! !
!WAX categoriesFor: #unescapedText:!public!writing! !
!WAX categoriesFor: #unescapedText:newline:!public!writing! !
!WAX categoriesFor: #verifyPrefixes!private! !
!WAX categoriesFor: #willIndent!private! !
!WAX categoriesFor: #write:!private! !
!WAX categoriesFor: #writeDocType:!private! !
!WAX categoriesFor: #writeIndent!private! !
!WAX categoriesFor: #writeSchemaLocations!private! !
!WAX categoriesFor: #writeXMLDeclaration:!private! !
!WAX categoriesFor: #xslt:!public!writing! !

!WAX class methodsFor!

macLineSeparator
	^String with: Character nl!

new
^super new initialize!

stream: aStream

stream: aStream version: aSymbol

unixLineSeparator
^String with: Character nl!

windowsLineSeparator
	^String with: Character cr with: Character nl! !
!WAX class categoriesFor: #macLineSeparator!accessing!public! !
!WAX class categoriesFor: #new!public! !
!WAX class categoriesFor: #stream:!instance creation!public! !
!WAX class categoriesFor: #stream:version:!instance creation!public! !
!WAX class categoriesFor: #unixLineSeparator!accessing!public! !
!WAX class categoriesFor: #windowsLineSeparator!accessing!public! !

XMLUtil guid: (GUID fromString: '{C234F5E7-C472-42BA-B139-1FA529CCAFB6}')!
XMLUtil comment: 'This class provides utility methods for working with XML.'!
!XMLUtil categoriesForClass!Unclassified! !
!XMLUtil class methodsFor!

defaultEncoding

escape: aString 

flag: aSymbol 
	!

isComment: aString 

isName: aString 

isURI: aString 
	"answer whether aString is a URI"

	| alpha authority digit fragment hierPart pathAbempty query scheme uri |
	self flag: #todo.	"This isn't working yet."
	"^URI fromString: aString"

	"See http://gbiv.com/protocols/uri/rfc/rfc3986.html#generic-syntax."
	alpha := ''.
	authority := ''.
	digit := ''.
	fragment := ''.
	pathAbempty := ''.
	hierPart := '//' , authority , pathAbempty.
	query := ''.
	scheme := alpha , '(' , alpha , '|' , digit , '|\+|-|\.)*'.
	uri := scheme , ':' , hierPart , '(' , query , ')?(#' , fragment , ')?'.
	^true!

isVersion: aSymbol

latinNameRegex

verifyComment: aString

verifyName: aString

verifyURI: aString

verifyVersion: aSymbol

xmlSchemaInstanceNS
!XMLUtil class categoriesFor: #defaultEncoding!constants!public! !
!XMLUtil class categoriesFor: #escape:!public!transforming! !
!XMLUtil class categoriesFor: #flag:!public! !
!XMLUtil class categoriesFor: #isComment:!public!testing! !
!XMLUtil class categoriesFor: #isName:!public!testing! !
!XMLUtil class categoriesFor: #isURI:!public!testing! !
!XMLUtil class categoriesFor: #isVersion:!public!testing! !
!XMLUtil class categoriesFor: #latinNameRegex!private! !
!XMLUtil class categoriesFor: #verifyComment:!public!testing! !
!XMLUtil class categoriesFor: #verifyName:!public!testing! !
!XMLUtil class categoriesFor: #verifyURI:!public!testing! !
!XMLUtil class categoriesFor: #verifyVersion:!public!testing! !
!XMLUtil class categoriesFor: #xmlSchemaInstanceNS!constants!public! !

IllegalArgumentException guid: (GUID fromString: '{CDB9D3D8-978A-412B-A35E-CD2ABE742F53}')!
IllegalArgumentException comment: ''!
!IllegalArgumentException categoriesForClass!Unclassified! !
IllegalStateException guid: (GUID fromString: '{114B33CF-2B87-46C8-BAF2-432058B1A47E}')!
IllegalStateException comment: ''!
!IllegalStateException categoriesForClass!Unclassified! !
"Binary Globals"!
