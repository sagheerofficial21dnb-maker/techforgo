<?php
/**
 * TechForGo functions and definitions
 *
 * @package TechForGo
 * @since 1.0.2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'TECHFORGO_VERSION', '1.0.2' );

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function techforgo_setup() {
	// Make theme available for translation.
	load_theme_textdomain( 'techforgo', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// Let WordPress manage the document title.
	add_theme_support( 'title-tag' );

	// Enable support for Post Thumbnails on posts and pages.
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 760, 428, true );
	add_image_size( 'techforgo-hero', 1200, 675, true );
	add_image_size( 'techforgo-card', 640, 360, true );
	add_image_size( 'techforgo-thumb', 120, 80, true );

	// Register Navigation Menus
	register_nav_menus(
		array(
			'primary' => esc_html__( 'Primary Menu', 'techforgo' ),
			'footer'  => esc_html__( 'Footer Menu', 'techforgo' ),
		)
	);

	// HTML5 Support
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Custom logo support
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 60,
			'width'       => 240,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);

	// Gutenberg / Block editor alignment support
	add_theme_support( 'align-wide' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/css/style.css' );
}
add_action( 'after_setup_theme', 'techforgo_setup' );

/**
 * Set the content width in pixels.
 */
function techforgo_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'techforgo_content_width', 760 );
}
add_action( 'after_setup_theme', 'techforgo_content_width', 0 );

/**
 * Register widget areas, including AdSense-ready compliance slots.
 */
function techforgo_widgets_init() {
	// Primary Sidebar
	register_sidebar(
		array(
			'name'          => esc_html__( 'Primary Sidebar', 'techforgo' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here to appear in your sidebar.', 'techforgo' ),
			'before_widget' => '<section id="%1$s" class="tfg-widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h3 class="tfg-widget-title">',
			'after_title'   => '</h3>',
		)
	);

	// AdSense / Advertisement Slot: In-Article / After Summary (Policy Compliant)
	register_sidebar(
		array(
			'name'          => esc_html__( 'AdSense Slot: In-Article Top', 'techforgo' ),
			'id'            => 'adsense-in-article',
			'description'   => esc_html__( 'Ethical, policy-compliant ad placement slot above article prose.', 'techforgo' ),
			'before_widget' => '<div id="%1$s" class="tfg-ad-slot %2$s" style="margin: 24px 0; text-align: center;">',
			'after_widget'  => '</div>',
			'before_title'  => '<span class="screen-reader-text">',
			'after_title'   => '</span>',
		)
	);

	// AdSense / Advertisement Slot: Post Bottom
	register_sidebar(
		array(
			'name'          => esc_html__( 'AdSense Slot: Article Footer', 'techforgo' ),
			'id'            => 'adsense-post-bottom',
			'description'   => esc_html__( 'Ethical ad placement slot after article content and before author bio.', 'techforgo' ),
			'before_widget' => '<div id="%1$s" class="tfg-ad-slot %2$s" style="margin: 32px 0; text-align: center;">',
			'after_widget'  => '</div>',
			'before_title'  => '<span class="screen-reader-text">',
			'after_title'   => '</span>',
		)
	);

	// Footer Columns
	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer Column 1', 'techforgo' ),
			'id'            => 'footer-1',
			'description'   => esc_html__( 'Widgets in the first footer column.', 'techforgo' ),
			'before_widget' => '<div id="%1$s" class="tfg-footer-widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h4 class="tfg-footer-col-title">',
			'after_title'   => '</h4>',
		)
	);

	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer Column 2', 'techforgo' ),
			'id'            => 'footer-2',
			'description'   => esc_html__( 'Widgets in the second footer column.', 'techforgo' ),
			'before_widget' => '<div id="%1$s" class="tfg-footer-widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h4 class="tfg-footer-col-title">',
			'after_title'   => '</h4>',
		)
	);

	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer Column 3', 'techforgo' ),
			'id'            => 'footer-3',
			'description'   => esc_html__( 'Widgets in the third footer column.', 'techforgo' ),
			'before_widget' => '<div id="%1$s" class="tfg-footer-widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h4 class="tfg-footer-col-title">',
			'after_title'   => '</h4>',
		)
	);
}
add_action( 'widgets_init', 'techforgo_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function techforgo_scripts() {
	wp_enqueue_style(
		'techforgo-fonts',
		'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=JetBrains+Mono:wght@400;500&display=swap',
		array(),
		null
	);

	wp_enqueue_style( 'techforgo-style', get_stylesheet_uri(), array(), TECHFORGO_VERSION );

	if ( file_exists( get_template_directory() . '/assets/css/style.css' ) ) {
		wp_enqueue_style( 'techforgo-custom', get_template_directory_uri() . '/assets/css/style.css', array( 'techforgo-style' ), TECHFORGO_VERSION );
	}

	wp_enqueue_script(
		'techforgo-main',
		get_template_directory_uri() . '/assets/js/main.js',
		array(),
		TECHFORGO_VERSION,
		array(
			'strategy'  => 'defer',
			'in_footer' => true,
		)
	);

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'techforgo_scripts' );

/**
 * Dedicated Blog Archive Query: strictly enforce 10 posts per page.
 */
function techforgo_enforce_blog_posts_per_page( $query ) {
	if ( ! is_admin() && $query->is_main_query() && ( $query->is_home() || $query->is_archive() ) ) {
		$query->set( 'posts_per_page', 10 );
	}
}
add_action( 'pre_get_posts', 'techforgo_enforce_blog_posts_per_page' );

/**
 * Estimated reading time helper.
 */
function techforgo_reading_time( $post_id = null ) {
	$content    = get_post_field( 'post_content', $post_id ? $post_id : get_the_ID() );
	$word_count = str_word_count( strip_tags( $content ) );
	$minutes    = ceil( $word_count / 200 );
	return max( 1, $minutes ) . ' ' . esc_html__( 'min read', 'techforgo' );
}

/**
 * Post publication meta helper.
 */
function techforgo_posted_on() {
	$time_string = sprintf(
		'<time class="entry-date published updated" datetime="%1$s">%2$s</time>',
		esc_attr( get_the_date( DATE_W3C ) ),
		esc_html( get_the_date( 'M j, Y' ) )
	);
	echo '<span class="posted-on">' . $time_string . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

/**
 * Post author meta helper.
 */
function techforgo_posted_by() {
	$byline = sprintf(
		/* translators: %s: post author. */
		esc_html_x( 'By %s', 'post author', 'techforgo' ),
		'<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
	);
	echo '<span class="byline"> ' . $byline . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

/**
 * Custom numeric pagination.
 */
function techforgo_pagination() {
	the_posts_pagination(
		array(
			'mid_size'           => 2,
			'prev_text'          => sprintf( '<span aria-hidden="true">&larr;</span> %s', esc_html__( 'Previous', 'techforgo' ) ),
			'next_text'          => sprintf( '%s <span aria-hidden="true">&rarr;</span>', esc_html__( 'Next', 'techforgo' ) ),
			'before_page_number' => '<span class="meta-nav screen-reader-text">' . esc_html__( 'Page', 'techforgo' ) . ' </span>',
			'class'              => 'tfg-pagination',
		)
	);
}

/**
 * Excerpt length.
 */
function techforgo_excerpt_length( $length ) {
	return 24;
}
add_filter( 'excerpt_length', 'techforgo_excerpt_length', 999 );

/**
 * Excerpt ellipsis.
 */
function techforgo_excerpt_more( $more ) {
	return '&hellip;';
}
add_filter( 'excerpt_more', 'techforgo_excerpt_more' );
