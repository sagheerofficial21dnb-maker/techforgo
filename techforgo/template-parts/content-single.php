<?php
/**
 * Template part for displaying single post content
 *
 * @package TechForGo
 * @since 1.0.0
 */

?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'tfg-single-post' ); ?>>
	<header class="tfg-single-header">
		<div class="tfg-meta-row">
			<?php
			$categories = get_the_category();
			if ( ! empty( $categories ) ) :
				?>
				<a href="<?php echo esc_url( get_category_link( $categories[0]->term_id ) ); ?>" class="tfg-category-label">
					<?php echo esc_html( $categories[0]->name ); ?>
				</a>
				<span aria-hidden="true">&middot;</span>
			<?php endif; ?>
			<time datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>"><?php echo esc_html( get_the_date( 'F j, Y' ) ); ?></time>
			<span aria-hidden="true">&middot;</span>
			<span class="tfg-read-time"><?php echo esc_html( techforgo_reading_time() ); ?></span>
		</div>

		<?php the_title( '<h1 class="tfg-single-title">', '</h1>' ); ?>

		<?php if ( has_excerpt() ) : ?>
			<div class="tfg-single-deck">
				<?php the_excerpt(); ?>
			</div>
		<?php endif; ?>

		<div class="tfg-single-author-strip">
			<?php echo get_avatar( get_the_author_meta( 'ID' ), 40, '', '', array( 'class' => 'tfg-avatar-md' ) ); ?>
			<div class="tfg-single-author-details">
				<div class="tfg-author-byline"><?php techforgo_posted_by(); ?></div>
				<span class="tfg-author-role"><?php echo esc_html( get_the_author_meta( 'description' ) ? wp_trim_words( get_the_author_meta( 'description' ), 10 ) : 'Staff Technology Editor' ); ?></span>
			</div>
		</div>
	</header>

	<?php if ( has_post_thumbnail() ) : ?>
		<div class="tfg-single-hero-media">
			<?php the_post_thumbnail( 'techforgo-hero', array( 'loading' => 'eager' ) ); ?>
			<?php if ( get_the_post_thumbnail_caption() ) : ?>
				<figcaption class="wp-caption-text"><?php echo esc_html( get_the_post_thumbnail_caption() ); ?></figcaption>
			<?php endif; ?>
		</div>
	<?php endif; ?>

	<?php if ( is_active_sidebar( 'adsense-in-article' ) ) : ?>
		<div class="tfg-ad-placement-slot tfg-ad-top" style="margin: 24px 0;">
			<?php dynamic_sidebar( 'adsense-in-article' ); ?>
		</div>
	<?php endif; ?>

	<div class="tfg-article-prose">
		<?php
		the_content();

		wp_link_pages(
			array(
				'before'      => '<div class="page-links">' . esc_html__( 'Pages:', 'techforgo' ),
				'after'       => '</div>',
				'link_before' => '<span class="page-number">',
				'link_after'  => '</span>',
			)
		);
		?>
	</div>

	<footer class="tfg-single-footer">
		<?php
		$tags_list = get_the_tag_list( '', ' &middot; ' );
		if ( $tags_list ) :
			?>
			<div class="tfg-single-tags">
				<span class="tfg-tags-label"><?php esc_html_e( 'Topics:', 'techforgo' ); ?></span>
				<span class="tfg-tags-content"><?php echo $tags_list; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
			</div>
		<?php endif; ?>
	</footer>
</article>
