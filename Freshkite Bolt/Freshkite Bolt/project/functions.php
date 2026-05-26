<?php
/**
 * Freshkite — WordPress Theme Functions
 *
 * @package Freshkite
 * @version 1.0.0
 */

// ── Theme Setup ───────────────────────────────────────────────────────────────
function freshkite_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', [
        'script', 'style', 'search-form',
        'comment-form', 'comment-list', 'gallery', 'caption',
    ] );
    register_nav_menus( [
        'primary' => __( 'Primary Navigation', 'freshkite' ),
    ] );
}
add_action( 'after_setup_theme', 'freshkite_setup' );

// ── Enqueue Styles & Scripts ──────────────────────────────────────────────────
function freshkite_enqueue_assets() {
    $uri = get_template_directory_uri();
    $ver = '1.0.0';

    // Google Fonts
    wp_enqueue_style(
        'freshkite-fonts',
        'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;450;500;600&family=JetBrains+Mono:wght@400;500&display=swap',
        [],
        null
    );

    // Main stylesheet  (style.css doubles as the WordPress theme stylesheet)
    wp_enqueue_style(
        'freshkite-style',
        get_stylesheet_uri(),   // points to style.css in the theme root
        [ 'freshkite-fonts' ],
        $ver
    );

    // ── CDN libraries loaded in <head> (Babel needs them before JSX is parsed) ──

    // React 18
    wp_enqueue_script(
        'react',
        'https://unpkg.com/react@18.3.1/umd/react.development.js',
        [],
        null,
        false   // load in <head>
    );

    // ReactDOM 18
    wp_enqueue_script(
        'react-dom',
        'https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js',
        [ 'react' ],
        null,
        false
    );

    // Babel Standalone (in-browser JSX transpilation)
    wp_enqueue_script(
        'babel-standalone',
        'https://unpkg.com/@babel/standalone@7.29.0/babel.min.js',
        [],
        null,
        false
    );

    // GSAP (used by timezone chart)
    wp_enqueue_script(
        'gsap',
        'https://unpkg.com/gsap@3.12.2/dist/gsap.min.js',
        [],
        null,
        false
    );

    // ── Expose theme URLs to JavaScript / JSX components ──────────────────────
    // Resolves asset paths (logo, partner images) and internal page URLs
    // that are hard-coded as relative paths in the original static build.
    wp_add_inline_script(
        'react',
        sprintf(
            'window.FRESHKITE_URI     = %s;' .
            'window.FRESHKITE_HOME    = %s;' .
            'window.FRESHKITE_CONTACT = %s;',
            wp_json_encode( $uri ),
            wp_json_encode( home_url( '/' ) ),
            wp_json_encode( home_url( '/contact/' ) )
        ),
        'before'
    );
}
add_action( 'wp_enqueue_scripts', 'freshkite_enqueue_assets' );

// ── Preconnect hints for Google Fonts ─────────────────────────────────────────
function freshkite_resource_hints( $hints, $relation_type ) {
    if ( 'preconnect' === $relation_type ) {
        $hints[] = [ 'href' => 'https://fonts.googleapis.com' ];
        $hints[] = [ 'href' => 'https://fonts.gstatic.com', 'crossorigin' => 'anonymous' ];
    }
    return $hints;
}
add_filter( 'wp_resource_hints', 'freshkite_resource_hints', 10, 2 );
