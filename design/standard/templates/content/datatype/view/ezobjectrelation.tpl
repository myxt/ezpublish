{* DO NOT EDIT THIS FILE! Use an override template instead. *}
{if and( $attribute.content, $attribute.content.can_read, $attribute.content.has_visible_node )}
    {content_view_gui view=text_linked content_object=$attribute.content}
{else}
   {'No relation'|i18n( 'design/standard/content/datatype' )}
{/if}