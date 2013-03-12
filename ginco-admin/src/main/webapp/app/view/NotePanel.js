/*
 * File: app/view/NotePanel.js
 * Note Creation/Edition
 * 
 */
Ext.define('GincoApp.view.NotePanel', {
    extend: 'Ext.panel.Panel',

    termId: null,
    thesaurusData : '',

    alias: 'widget.notePanel',
    localized: true,
    closable: true,
    layout: {
    	type: 'vbox',
    	align: 'stretch'
    },
    /*Fields with auto generated values*/
    xIdentifierLabel : 'Identifier',
    xCreatedDateLabel : 'Creation date',
    xModifiedDateLabel : 'Modification date',
    xLexicalValueLabel : 'Lexical Value',
    xTypeLabel : 'Type',

    /*Fields prompting values*/
    xNoteConceptListGridTitle : 'List of notes',
    xLanguageLabel : 'Language',
    xAddNote: 'Add a note',
    xDetach: 'Delete a note',
    
    initComponent: function() {
        var me = this;
        me.noteConceptStore = Ext.create('GincoApp.store.ThesaurusNoteStore');

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                	flex: 1,
                	autoScroll: true,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Enregistrer',
                                    cls: 'save',
                                    iconCls : 'icon-save',
                                    itemId : 'saveNote',
                                    disabled : true
                                }
                            ]
                        }
                    ],
                    items: [{
							xtype : 'gridpanel',
							itemId : 'notegrid',
							title : me.xNoteConceptListGridTitle,
							store : me.noteConceptStore,

							dockedItems : [ {
								xtype : 'toolbar',
								dock : 'top',
								items : [ {
									xtype : 'button',
									itemId : 'newNoteBtn',
									text : me.xAddNote
								},{
	            			        xtype: 'pagingtoolbar',
	            			        store :  me.noteConceptStore,
	            			        pageSize: 10,
	            			        displayInfo: true
	            			    } ]
							} ],
							
							columns : [
									{ dataIndex : 'identifier', text : me.xIdentifierLabel, hidden: true },
									{ dataIndex : 'lexicalValue', text : me.xLexicalValueLabel, flex : 1},
									{ dataIndex : 'language', text : me.xLanguageLabel },
									{ dataIndex : 'type', text : me.xTypeLabel },
									{ dataIndex : 'created', text : me.xCreatedDateLabel },
									{ dataIndex : 'modified', text : me.xModifiedDateLabel },
									{ xtype : 'actioncolumn', itemId : 'noteActionColumn',
										items : [ {
											icon : 'images/detach.png',
											tooltip : me.xDetach
										} ]
									}
                            ]
						}
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});