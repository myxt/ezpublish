<?php
/**
 * File containing the ezcDocumentWikiExternalLinkToken struct
 *
 * @package Document
 * @version //autogen//
 * @copyright Copyright (C) 2005-2010 eZ Systems AS. All rights reserved.
 * @license http://ez.no/licenses/new_bsd New BSD License
 */

/**
 * Struct for Wiki document external link tokens
 *
 * @package Document
 * @version //autogen//
 */
class ezcDocumentWikiExternalLinkToken extends ezcDocumentWikiInlineMarkupToken
{
    /**
     * Set state after var_export
     *
     * @param array $properties
     * @return void
     * @ignore
     */
    public static function __set_state( $properties )
    {
        $tokenClass = __CLASS__;
        $token = new $tokenClass(
            $properties['content'],
            $properties['line'],
            $properties['position']
        );

        // Set additional token values
        // $token->value = $properties['value'];

        return $token;
    }
}

?>