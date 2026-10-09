<?php
/**
 * Template part for displaying posts in default feed
 *
 * @package TechForGo
 * @since 1.0.0
 */

?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'tfg-feed-article' ); ?>>
	<header class="tfg-article-header">
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
			<time datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>"><?php echo esc_html( get_the_date( 'M j, Y' ) ); ?></time>
			<span aria-hidden="true">&middot;</span>
			<span><?php echo esc_html( techforgo_reading_time() ); ?></span>
		</div>

		<?php
		if ( is_singular() ) :
			the_title( '<h1 class="tfg-single-title">', '</h1>' );
		else :
			the_title( '<h2 class="tfg-card-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
		endif;
		?>
	</header>

	<?php if ( has_post_thumbnail() && ! is_singular() ) : ?>
		<div class="tfg-feed-thumbnail">
			<a href="<?php the_permalink(); ?>">
				<?php the_post_thumbnail( 'techforgo-card' ); ?>
			</a>
		</div>
	<?php endif; ?>

	<div class="tfg-article-content">
		<?php
		if ( is_singular() ) :
			the_content();
			wp_link_pages(
				array(
					'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'techforgo' ),
					'after'  => '</div>',
				)
			);
		else :
			the_excerpt();
		endif;
		?>
	</div>
</article>
