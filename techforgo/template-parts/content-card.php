<?php
/**
 * Template part for displaying posts as cards in grids
 *
 * @package TechForGo
 * @since 1.0.0
 */

?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'tfg-card' ); ?>>
	<?php if ( has_post_thumbnail() ) : ?>
		<div class="tfg-card-thumb-wrap">
			<a href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
				<?php the_post_thumbnail( 'techforgo-card', array( 'class' => 'tfg-card-thumb', 'loading' => 'lazy' ) ); ?>
			</a>
		</div>
	<?php endif; ?>

	<div class="tfg-card-body">
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
			<span><?php echo esc_html( techforgo_reading_time() ); ?></span>
		</div>

		<h2 class="tfg-card-title">
			<a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a>
		</h2>

		<div class="tfg-card-excerpt">
			<?php the_excerpt(); ?>
		</div>

		<div class="tfg-card-author-row">
			<?php echo get_avatar( get_the_author_meta( 'ID' ), 24, '', '', array( 'class' => 'tfg-avatar-sm' ) ); ?>
			<span class="tfg-author-name"><?php the_author(); ?></span>
			<span aria-hidden="true">&middot;</span>
			<time datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>"><?php echo esc_html( get_the_date( 'M j, Y' ) ); ?></time>
		</div>
	</div>
</article>
