{let content=$class_attribute.content}

<div class="element">
<label>{'Selection method'|i18n( 'design/standard/class/datatype' )}</label><div class="labelbreak"></div>
    <p>{$content.selection_type|choose( 'Browse'|i18n( 'design/standard/class/datatype' ),
                                        'Dropdown list'|i18n( 'design/standard/class/datatype' ),
                                        'Dropdown tree'|i18n( 'design/standard/class/datatype' ) )}</p>
</div>

<div class="element">
<label>{'Default selection node'|i18n( 'design/standard/class/datatype' )}</label><div class="labelbreak"></div>
{section show=$content.default_selection_node}
    {let selection_node=fetch( content, node, hash( node_id, $content.default_selection_node ) )}
    <p>{'Selecting from %nodename'|i18n( 'design/standard/class/datatype',, hash( '%nodename', $selection_node.name ) )}</p>
    {/let}
{/section}

<p>
{section show=$content.fuzzy_match}
    {'Allow fuzzy match'|i18n( 'design/standard/class/datatype' )}
{section-else}
    {'Do not allow fuzzy match'|i18n( 'design/standard/class/datatype' )}
{/section}
</p>

</div>

{/let}
